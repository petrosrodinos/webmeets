import { PartialType } from '@nestjs/swagger';
import { CreateClosureDto } from './create-closure.dto';

export class UpdateClosureDto extends PartialType(CreateClosureDto) {}
