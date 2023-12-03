import { PartialType } from '@nestjs/swagger';
import { CreateHookDto } from './create-hook.dto';

export class UpdateHookDto extends PartialType(CreateHookDto) {}
