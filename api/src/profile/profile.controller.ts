import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateJwtService } from 'src/auth/jwt/jwt.service';

@Controller('profiles')
export class ProfileController {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly profileService: ProfileService,
    private jwt: CreateJwtService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@GetUser('_id') userId: string, @Body() createProfileDto: CreateProfileDto) {
    const profile = await this.profileService.create(userId, createProfileDto);
    const user = await this.userModel.findById(userId);
    user.profileId = profile.id;
    await user.save();

    const token = await this.jwt.signToken({
      id: user.id,
      profileId: profile.id,
    });

    console.log('token', token);

    return {
      ...token,
      profile,
    };
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
