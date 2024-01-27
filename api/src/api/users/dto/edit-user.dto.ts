import { PartialType } from '@nestjs/swagger';
import { SignUpDto } from 'src/api/auth/dto';

export class UpdateUserDto extends PartialType(SignUpDto) {}
