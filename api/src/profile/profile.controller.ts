import {
  Controller,
  UseInterceptors,
  Get,
  Post,
  UploadedFiles,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtGuard } from '../auth/guard';
import { Profile } from 'src/schemas/profile.schema';
import { UserService } from 'src/user/user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('profiles')
@ApiTags('Profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiOkResponse({ type: Profile })
  @ApiBearerAuth()
  async create(
    @Req() req: Express.Request,
    @Body() createProfileDto: CreateProfileDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const userId = req.user.userId;
    const profile = await this.profileService.create(userId, files, createProfileDto);
    await this.userService.update(req.user.userId, { profileId: profile._id.toString() });

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
