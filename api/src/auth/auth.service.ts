import { ForbiddenException, Injectable, ConflictException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { Model, Error } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
    private s3Service: S3Service,
  ) {}

  async signup(dto: SignUpDto, file: Express.Multer.File) {
    const existingUser = await this.userModel.findOne({
      email: dto.email,
    });

    if (existingUser) {
      throw new ConflictException('Credentials taken');
    }

    const fileName = `${dto.email}-${Date.now()}`;
    let avatarUrl = await this.s3Service.uploadFile(file, fileName);

    const hash = await argon.hash(dto.password);

    try {
      const user = new this.userModel({
        ...dto,
        avatar: avatarUrl,
        password: hash,
      });
      await user.save();

      const token = await this.signToken({
        id: user.id,
      });

      delete user.password;

      return {
        ...token,
        ...user.toJSON(),
      };
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
      profileId: user?.profileId || null,
    });
  }

  async signToken(payload: any): Promise<{ access_token: string }> {
    const secret = this.config.get('JWT_SECRET');
    const expiration = this.config.get('JWT_EXPIRATION_TIME');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: expiration,
      secret,
    });

    return {
      access_token: token,
    };
  }
}
