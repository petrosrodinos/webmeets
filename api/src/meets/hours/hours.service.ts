import { CreateHoursDto } from './dto/create-hours.dto';
import { UpdateHoursDto } from './dto/update-hours.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { Meet } from 'src/schemas/meet.schema';
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class HoursService {
  constructor(
    @InjectModel(Meet.name)
    private meetModel: Model<Meet>,
  ) {}
  async create(meetId: string, createHoursDto: CreateHoursDto) {
    try {
      const meet = await this.meetModel.findById(meetId);
      if (!meet) {
        throw new NotFoundException('Could not find meet.');
      }
      meet.hours.push(createHoursDto);
      await meet.save();
      return meet;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async update(id: string, updateMeetDto: UpdateHoursDto) {
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
