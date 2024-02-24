import { PartialType } from '@nestjs/swagger';
import { CreateMessageDto } from './create-chat.dto';

export class UpdateChatDto extends PartialType(CreateMessageDto) {}
