import { Controller, Post, Body, Patch, Param, UseGuards, Delete } from '@nestjs/common';
import { JwtGuard } from '../../auth/guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Meet } from 'src/schemas/meet.schema';
import { HoursService } from './hours.service';
import { UpdatePeriodDto } from './dto/update-hour.dto';
import { CreateHourDto, CreatePeriodDto } from './dto/create-hour.dto';

@Controller('meets/:id/hours')
@ApiTags('Hour')
@UseGuards(JwtGuard)
export class HoursController {
  constructor(private readonly hoursService: HoursService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  async create(@Param('id') id: string, @Body() createHourDto: CreateHourDto) {
    return await this.hoursService.create(id, createHourDto);
  }

  @Post(':hourId/periods')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  update(@Param('id') id: string, @Param('hourId') hourId: string, @Body() createPeriodDto: CreatePeriodDto) {
    return this.hoursService.createPeriod(id, hourId, createPeriodDto);
  }

  @Patch(':hourId/periods/:periodId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  updatePeriod(
    @Param('id') id: string,
    @Param('hourId') hourId: string,
    @Param('periodId') periodId: string,
    @Body() updatePeriodsDto: UpdatePeriodDto,
  ) {
    return this.hoursService.editPeriod(id, hourId, periodId, updatePeriodsDto);
  }

  @Delete(':hourId/periods/:periodId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  deletePeriod(@Param('id') id: string, @Param('hourId') hourId: string, @Param('periodId') periodId: string) {
    return this.hoursService.removePeriod(id, hourId, periodId);
  }
}
