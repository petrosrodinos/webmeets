import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { Meet } from 'src/schemas/meet.schema';
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class MeetService {
  constructor(
    @InjectModel(Meet.name)
    private meetModel: Model<Meet>,
  ) {}
  async create(userId: string, profileId: string, createMeetDto: CreateMeetDto) {
    try {
      const meet = new this.meetModel({
        ...createMeetDto,
        userId,
        profileId,
      });
      await meet.save();

      return meet;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async findAll() {
    try {
      const meets = await this.meetModel.find().populate('userId profileId serviceId', '-password -email -phone');
      if (!meets || meets.length === 0) {
        throw new NotFoundException('Could not find meets.');
      }
      return meets;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const meet = await this.meetModel.findById(id).populate('userId profileId serviceId', '-password -email -phone');
      if (!meet) {
        throw new NotFoundException('Could not find profile.');
      }
      return meet;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateMeetDto: UpdateMeetDto) {
    try {
      const updatedMeet = await this.meetModel.findOneAndUpdate({ _id: id }, { $set: updateMeetDto }, { new: true });
      if (!updatedMeet) {
        throw new NotFoundException('Could not find meet.');
      }
      return updatedMeet;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const deletedMeet = await this.meetModel.findOneAndDelete({ _id: id });
      if (!deletedMeet) {
        throw new NotFoundException('Could not find meet.');
      }
      return deletedMeet;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
