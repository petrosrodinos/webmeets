import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MeetService } from './meet.service';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';
import { JwtGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Meet } from 'src/schemas/meet.schema';
import { UserService } from 'src/user/user.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('meets')
@ApiTags('Meet')
export class MeetController {
  constructor(
    private readonly meetService: MeetService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  async create(
    @Req() req: Express.Request,
    @Body() createMeetDto: CreateMeetDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { userId, profileId } = req.user;
    let profileid = profileId;
    if (!profileid) {
      const user = await this.userService.findOne(userId);
      profileid = user.profileId._id.toString();
    }

    return this.meetService.create(userId, profileId, createMeetDto, files);
  }

  @Get()
  @ApiOkResponse({ type: Meet })
  findAll() {
    return this.meetService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Meet })
  findOne(@Param('id') id: string) {
    return this.meetService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  update(@Param('id') id: string, @Body() updateMeetDto: UpdateMeetDto) {
    return this.meetService.update(id, updateMeetDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  remove(@Param('id') id: string) {
    return this.meetService.remove(id);
  }
}
