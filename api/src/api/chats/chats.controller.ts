import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, ForbiddenException } from '@nestjs/common';
import { CreateChatDto, CreateMessageDto } from './dto/create-chat.dto';
import { Chat, Message } from 'src/schemas/chat.schema';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { ChatService } from './chats.service';

@Controller('chats')
@UseGuards(JwtGuard)
@ApiTags('Chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: Chat })
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get()
  findAll(@Req() req: Express.Request) {
    const { userId } = req.user;

    return this.chatService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Post(':id/messages')
  @ApiOkResponse({ type: Message })
  createMessage(@Param('id') id: string, @Body() createMessageDto: CreateMessageDto) {
    return this.chatService.createMessage(id, createMessageDto);
  }
}
