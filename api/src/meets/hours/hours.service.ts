import { CreateHourDto, CreatePeriodDto } from './dto/create-hour.dto';
import { UpdateHourDto, UpdatePeriodDto } from './dto/update-hour.dto';
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
  async create(meetId: string, createHoursDto: CreateHourDto) {
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

  async createPeriod(meetId: string, hourId: string, createPeriodsDto: CreatePeriodDto) {
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

  async editPeriod(meetId: string, hourId: string, periodId: string, updatePeriodsDto: UpdatePeriodDto) {
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

  async removePeriod(meetId: string, hourId: string, periodId: string) {
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

      hour.periods = hour.periods.filter((period: any) => period._id != periodId);
      await meet.save();
      return meet;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
