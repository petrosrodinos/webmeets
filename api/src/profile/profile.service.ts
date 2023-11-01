import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from 'src/schemas/profile.schema';
import { Model, Error } from 'mongoose';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<Profile>,
    private s3Service: S3Service,
  ) {}

  async create(userId: string, files: Express.Multer.File[], createProfileDto: CreateProfileDto) {
    try {
      let fileUrls = await this.s3Service.uploadFiles(files);

      const profile = new this.profileModel({
        ...createProfileDto,
        ...fileUrls,
        userId,
      });
      await profile.save();

      return profile;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async findAll() {
    try {
      const profiles = await this.profileModel.find().populate('userId', '-password -email -phone');
      if (!profiles || profiles.length === 0) {
        throw new NotFoundException('Could not find profiles.');
      }
      return profiles;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const profile = await this.profileModel.findById(id).populate('userId', '-password -email -phone');
      if (!profile) {
        throw new NotFoundException('Could not find profile.');
      }
      return profile;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    try {
      const updatedProfile = await this.profileModel.findOneAndUpdate({ _id: id }, { $set: updateProfileDto }, { new: true });
      if (!updatedProfile) {
        throw new NotFoundException('Could not find profile.');
      }
      return updatedProfile;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const deletedProfile = await this.profileModel.findOneAndDelete({ _id: id });
      if (!deletedProfile) {
        throw new NotFoundException('Could not find profile.');
      }
      return deletedProfile;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
