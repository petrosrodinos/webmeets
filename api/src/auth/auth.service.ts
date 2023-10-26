import { ForbiddenException, Injectable, ConflictException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Error } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(data: SignUpDto) {
    const existingUser = await this.userModel.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new ConflictException('Credentials taken');
    }

    const hash = await argon.hash(data.password);

    try {
      const user = new this.userModel({
        ...data,
        password: hash,
      });
      await user.save();

      return this.signToken({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async signin(data: SignInDto) {
    const user = await this.userModel.findOne({
      email: data.email,
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passwordMatch = await argon.verify(user.password, data.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken({
      id: user.id,
      email: user.email,
    });
  }

  async signToken(payload: any): Promise<{ access_token: string }> {
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
