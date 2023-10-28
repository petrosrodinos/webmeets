import { PartialType } from '@nestjs/swagger';
import { SignUpDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(SignUpDto) {}
