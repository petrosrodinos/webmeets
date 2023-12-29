import { Controller, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Meet } from 'src/schemas/meet.schema';
import { HoursService } from './hours.service';
import { UpdateHoursDto, UpdatePeriodsDto } from './dto/update-hours.dto';
import { CreateHoursDto, CreatePeriodsDto } from './dto/create-hours.dto';

@Controller('meets/:id/hours')
export class HoursController {
  constructor(private readonly hoursService: HoursService) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  async create(@Param('id') id: string, @Body() createHoursDto: CreateHoursDto) {
    return await this.hoursService.create(id, createHoursDto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  update(@Param('id') id: string, @Body() updateHoursDto: UpdateHoursDto) {
    return this.hoursService.update(id, updateHoursDto);
  }
}
