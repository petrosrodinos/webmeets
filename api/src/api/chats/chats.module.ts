import { Module } from '@nestjs/common';
import { ChatService } from './chats.service';
import { ChatController } from './chats.controller';
import { ChatShema } from 'src/schemas/chat.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatShema }])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatsModule {}
