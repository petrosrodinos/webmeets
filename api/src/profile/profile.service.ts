import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from 'src/schemas/profile.schema';
import { Model, Error } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<Profile>,
  ) {}

  async create(userId: string, createProfileDto: CreateProfileDto) {
    try {
      const profile = new this.profileModel({
        ...createProfileDto,
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
      if (!profiles) {
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
      const result = await this.profileModel.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new NotFoundException('Could not find profile.');
      }
      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
