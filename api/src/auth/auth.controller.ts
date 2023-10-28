import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOkResponse({ type: User })
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() dto: SignUpDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({
          //   maxSize: 1000,
          // }),
          // new FileTypeValidator({
          //   fileType: 'image/jpeg',
          // }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    return this.authService.signup(dto, file.buffer);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }
}
