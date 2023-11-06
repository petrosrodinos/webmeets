import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from 'src/schemas/service.schema';
import { Model, Error } from 'mongoose';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<Service>,
    private s3Service: S3Service,
  ) {}

  async create(userId: string, profileId: string, createServiceDto: CreateServiceDto, files: Express.Multer.File[]) {
    try {
      let fileUrls = await this.s3Service.uploadFiles(files);

      const service = new this.serviceModel({
        ...createServiceDto,
        ...fileUrls,
        userId,
        profileId,
      });
      await service.save();

      return service;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async findAll() {
    try {
      const services = await this.serviceModel.find().populate('userId profileId', '-password -email -phone');
      if (!services || services.length === 0) {
        throw new NotFoundException('Could not find services.');
      }
      return services;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const service = await this.serviceModel.findById(id).populate('userId profileId', '-password -email -phone').exec();
      if (!service) {
        throw new NotFoundException('Could not find service.');
      }

      return service;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    try {
      const updatedService = await this.serviceModel.findOneAndUpdate({ _id: id }, { $set: updateServiceDto }, { new: true });
      if (!updatedService) {
        throw new NotFoundException('Could not find service.');
      }
      return updatedService;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const deletedService = await this.serviceModel.findOneAndDelete({ _id: id });
      if (!deletedService) {
        throw new NotFoundException('Could not find service.');
      }
      return deletedService;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
