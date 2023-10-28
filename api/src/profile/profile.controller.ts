import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Profile } from 'src/schemas/profile.schema';
import { UserService } from 'src/user/user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(
    @InjectModel(Profile.name)
    private profileService: ProfileService,
    @InjectModel(User.name)
    private userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiOkResponse({ type: Profile })
  @ApiBearerAuth()
  async create(@GetUser('_id') userId: string, @Body() createProfileDto: CreateProfileDto) {
    const profile = await this.profileService.create(userId, createProfileDto);
    console.log('profile', profile);
    // await this.userService.update(userId, { profileId: profile.id });

    return profile;
  }

  @Get()
  @ApiOkResponse({ type: Profile, isArray: true })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Profile })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Profile })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Profile })
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
