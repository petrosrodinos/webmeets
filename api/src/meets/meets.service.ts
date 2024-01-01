import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { Meet } from 'src/schemas/meet.schema';
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class MeetService {
  constructor(
    @InjectModel(Meet.name)
    private meetModel: Model<Meet>,
    private s3Service: S3Service,
  ) {}
  async create(userId: string, profileId: string, createMeetDto: CreateMeetDto, files: Express.Multer.File[]) {
    try {
      const images = [];
      for (let i = 0; i < files?.length; i++) {
        const uploadedFileUrl = await this.s3Service.uploadFile(files[i]);
        images.push({
          file: uploadedFileUrl,
        });
      }

      const meet = new this.meetModel({
        ...createMeetDto,
        images,
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

  async findAll(query: any) {
    try {
      const meets = await this.meetModel
        .find({
          ...query,
        })
        .populate('userId profileId', '-password -email -phone');
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
      const meet = await this.meetModel.findById(id).populate('userId profileId', '-password -email -phone');
      if (!meet) {
        throw new NotFoundException('Could not find meet.');
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

  async addImages(meetId: string, files: Express.Multer.File[]) {
    try {
      const meet = await this.meetModel.findById(meetId);
      if (!meet) {
        throw new NotFoundException('Could not find meet.');
      }

      const images = [];
      for (let i = 0; i < files?.length; i++) {
        const uploadedFileUrl = await this.s3Service.uploadFile(files[i]);
        images.push({
          file: uploadedFileUrl,
        });
      }

      meet.images.push(...images);

      await meet.save();

      return meet.populate('userId profileId', '-password -email -phone');
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }
}
