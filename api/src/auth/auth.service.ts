import { ForbiddenException, Injectable, ConflictException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { Model, Error } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AuthService {
  private s3Client = new S3Client({ region: this.config.get('AWS_S3_REGION') });
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpDto, file: Buffer) {
    // const existingUser = await this.userModel.findOne({
    //   email: dto.email,
    // });

    // if (existingUser) {
    //   throw new ConflictException('Credentials taken');
    // }
    let avatarUrl;
    try {
      const data = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.config.get('AWS_FILES_BUCKET_NAME'),
          Key: `${dto.email}-avatar.png`,
          Body: file,
        }),
      );
      console.log('avatar', data);
      // avatarUrl = data.Location;
    } catch (err) {
      throw new Error(err.message);
    }

    const hash = await argon.hash(dto.password);

    try {
      const user = new this.userModel({
        ...dto,
        password: hash,
      });
      await user.save();

      return this.signToken({
        id: user.id,
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
