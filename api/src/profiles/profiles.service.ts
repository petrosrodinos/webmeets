import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from 'src/schemas/profile.schema';
import { Model, Error, Types } from 'mongoose';
import { S3Service } from 'src/aws-s3/aws-s3.service';
import { CreateJwtService } from 'src/auth/jwt/jwt.service';
import { Roles } from 'src/enums/roles';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<Profile>,
    private s3Service: S3Service,
    private jwt: CreateJwtService,
  ) {}

  async create(userId: string, files: Express.Multer.File[], createProfileDto: CreateProfileDto) {
    try {
      const bannerFile = files.find((file) => file.fieldname === 'banner');
      const avatarFile = files.find((file) => file.fieldname === 'avatar');

      let bannerUrl = undefined;
      let avatarUrl = undefined;
      if (bannerFile) {
        bannerUrl = await this.s3Service.uploadFile(bannerFile);
      }
      if (avatarFile) {
        avatarUrl = await this.s3Service.uploadFile(avatarFile);
      }

      const certificatesFiles = files.filter((file) => file.fieldname.includes('certificates'));

      const certificates = [];
      if (certificatesFiles.length > 0) {
        const certificatesUrls = await this.s3Service.uploadFiles(certificatesFiles);
        for (let i = 0; i < createProfileDto.certificates.length; i++) {
          certificates.push({
            _id: new Types.ObjectId(),
            name: createProfileDto.certificates[i].name,
            file: Object.values(certificatesUrls)[i],
          });
        }
      }

      const profile = new this.profileModel({
        ...createProfileDto,
        banner: bannerUrl,
        avatar: avatarUrl,
        certificates: certificates,
        userId,
      });
      await profile.save();

      const token = await this.jwt.signToken({
        userId,
        profileId: profile._id,
        role: Roles.ADMIN,
      });

      return {
        token,
        profile,
      };
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
