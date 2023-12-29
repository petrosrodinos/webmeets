import { CreateHoursDto, CreatePeriodsDto } from './dto/create-hours.dto';
import { UpdateHoursDto, UpdatePeriodsDto } from './dto/update-hours.dto';
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

  async createPeriod(meetId: string, hourId: string, createPeriodsDto: CreatePeriodsDto) {
    try {
      const meet = await this.meetModel.findById(meetId);
      if (!meet) {
        throw new NotFoundException('Could not find meet.');
      }

      const hour = meet.hours.find((hour: any) => hour._id == hourId);
      if (!hour) {
        throw new NotFoundException('Could not find hour.');
      }
      hour.periods.push(createPeriodsDto);
      await meet.save();
      return meet;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async editPeriod(meetId: string, hourId: string, periodId: string, updatePeriodsDto: UpdatePeriodsDto) {
    try {
      const meet = await this.meetModel.findById(meetId);
      if (!meet) {
        throw new NotFoundException('Could not find meet.');
      }

      const hour = meet.hours.find((hour: any) => hour._id == hourId);
      if (!hour) {
        throw new NotFoundException('Could not find hour.');
      }

      const period = hour.periods.find((period: any) => period._id == periodId);
      if (!period) {
        throw new NotFoundException('Could not find period.');
      }

      period.from = updatePeriodsDto.from;
      period.to = updatePeriodsDto.to;
      await meet.save();
      return meet;
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
