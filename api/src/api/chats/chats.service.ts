import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from 'src/schemas/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<Chat>,
  ) {}
  async create(createChatDto: CreateChatDto, req: Express.Request) {
    const { userId } = req.user;

    const existingChat = await this.chatModel.findOne({
      members: userId,
      meetId: createChatDto.meetId,
    });
    if (existingChat) {
      return existingChat;
    } else {
      const chat = new this.chatModel(createChatDto);
      await chat.save();
      return chat;
    }
  }

  async findAll(userId: string) {
    try {
      const chats = await this.chatModel
        .find({
          members: userId,
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
      return chat.populate(
        'profileId meetId meetId.profileId members bookingId.profileId bookingId messages.senderId',
        '-password -email -phone -birthDate',
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
