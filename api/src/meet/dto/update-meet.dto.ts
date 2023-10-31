import { PartialType } from '@nestjs/swagger';
import { CreateMeetDto } from './create-meet.dto';

export class UpdateMeetDto extends PartialType(CreateMeetDto) {}
