import { ForbiddenException, Injectable, ConflictException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { Model, Error } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { S3Service } from 'src/aws-s3/aws-s3.service';
import { CreateJwtService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private s3Service: S3Service,
    private jwt: CreateJwtService,
  ) {}

  async signup(dto: SignUpDto, file: Express.Multer.File | undefined) {
    const existingUser = await this.userModel.findOne({
      email: dto.email,
    });

    if (existingUser) {
      throw new ConflictException('Credentials taken');
    }

    let avatarUrl = undefined;
    if (file) {
      const fileName = `${dto.email}-${Date.now()}`;
      avatarUrl = await this.s3Service.uploadFile(file, fileName);
    }

    const hash = await argon.hash(dto.password);

    try {
      const user = new this.userModel({
        ...dto,
        avatar: avatarUrl,
        password: hash,
      });
      (await user.save()).toJSON();

      const token = await this.jwt.signToken({
        userId: user.id,
        role: user.role,
      });

      delete user.password;

      return {
        token,
        user: user,
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

    const token = await this.jwt.signToken({
      userId: user.id,
      profileId: user?.profileId || null,
      role: user.role,
    });

    const { password, ...rest } = user.toJSON();

    return {
      token: token,
      user: rest,
    };
  }
}
