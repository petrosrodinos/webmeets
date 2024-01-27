import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreateJwtService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signToken(payload: any): Promise<string> {
    const secret = this.config.get('JWT_SECRET');
    const expiration = this.config.get('JWT_EXPIRATION_TIME');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: expiration,
      secret,
    });

    return token;
  }
}
