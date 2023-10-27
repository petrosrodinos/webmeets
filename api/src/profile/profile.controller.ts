import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser('_id') userId: string, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(userId, createProfileDto);
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
