import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from 'src/schemas/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<Chat>,
  ) {}
  async create(createChatDto: CreateChatDto) {
    const chat = new this.chatModel(createChatDto);
    await chat.save();
    return chat;
  }

  async findAll(query: any) {
    try {
      const chats = await this.chatModel
        .find({
          ...query,
        })
        .populate(
          'profileId meetId meetId.profileId members bookingId.profileId bookingId messages.senderId',
          '-password -email -phone -birthDate',
        );
      if (!chats || chats.length === 0) {
        throw new NotFoundException('Could not find chats.');
      }
      return chats;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const chat = await this.chatModel
        .findById(id)
        .populate(
          'profileId meetId meetId.profileId members bookingId.profileId bookingId messages.senderId',
          '-password -email -phone -birthDate',
        );
      if (!chat) {
        throw new NotFoundException('Could not find message.');
      }
      return chat;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createMessage(id: string, createMessageDto: any) {
    try {
      const chat = await this.chatModel.findById(id);
      if (!chat) {
        throw new NotFoundException('Could not find chat.');
      }
      chat.messages.push(createMessageDto);
      await chat.save();
      return chat.messages[chat.messages.length - 1];
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
