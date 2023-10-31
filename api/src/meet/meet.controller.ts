import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { MeetService } from './meet.service';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';
import { JwtGuard } from '../auth/guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Meet } from 'src/schemas/meet.schema';
import { ProfileService } from 'src/profile/profile.service';

@Controller('meet')
@ApiTags('Meet')
export class MeetController {
  constructor(
    private readonly meetService: MeetService,
    private readonly profileService: ProfileService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiOkResponse({ type: Meet })
  @ApiBearerAuth()
  create(@Req() req: Express.Request, @Body() createMeetDto: CreateMeetDto) {
    const { userId, profileId } = req.user;
    return this.meetService.create(userId, profileId, createMeetDto);
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
