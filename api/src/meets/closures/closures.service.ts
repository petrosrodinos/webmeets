import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { Meet } from 'src/schemas/meet.schema';
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateClosureDto } from './dto/create-closure.dto';
import { UpdateClosureDto } from './dto/update-closure.dto';

@Injectable()
export class ClosuresService {
  constructor(
    @InjectModel(Meet.name)
    private meetModel: Model<Meet>,
  ) {}
  async create(meetId: string, createClosureDto: CreateClosureDto) {
    try {
      const meet = await this.meetModel.findById(meetId);
      if (!meet) {
        throw new NotFoundException('Could not find meet.');
      }
      meet.closures.push(createClosureDto);
      await meet.save();
      return meet;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }
  async update(meetId: string, closureId: string, updateClosureDto: UpdateClosureDto) {
    try {
      const meet = await this.meetModel.findById(meetId);
      if (!meet) {
        throw new NotFoundException('Could not find meet.');
      }

      const closure = meet.closures.find((closure: any) => closure._id == closureId);
      if (!closure) {
        throw new NotFoundException('Could not find closure.');
      }

      closure.name = updateClosureDto.name || closure.name;
      closure.from = updateClosureDto.from || closure.from;
      closure.to = updateClosureDto.to || closure.to;
      closure.description = updateClosureDto.description || closure.description;

      await meet.save();
      return meet;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(meetId: string, closureId: string) {
    try {
      const meet = await this.meetModel.findById(meetId);
      if (!meet) {
        throw new NotFoundException('Could not find meet.');
      }

      meet.closures = meet.closures.filter((closure: any) => closure._id != closureId);

      await meet.save();
      return meet;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
