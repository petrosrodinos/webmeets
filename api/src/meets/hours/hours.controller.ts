import { Controller, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Meet } from 'src/schemas/meet.schema';
import { HoursService } from './hours.service';
import { UpdatePeriodsDto } from './dto/update-hours.dto';
import { CreateHoursDto, CreatePeriodsDto } from './dto/create-hours.dto';

@Controller('meets/:id/hours')
@UseGuards(JwtGuard)
export class HoursController {
  constructor(private readonly hoursService: HoursService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  async create(@Param('id') id: string, @Body() createHoursDto: CreateHoursDto) {
    return await this.hoursService.create(id, createHoursDto);
  }

  @Post(':hourId/periods')
  @ApiOkResponse({ type: Meet })
  update(@Param('id') id: string, @Param('hourId') hourId: string, @Body() createPeriodsDto: CreatePeriodsDto) {
    return this.hoursService.createPeriod(id, hourId, createPeriodsDto);
  }

  @Patch(':hourId/periods/:periodId')
  @ApiOkResponse({ type: Meet })
  updatePeriod(
    @Param('id') id: string,
    @Param('hourId') hourId: string,
    @Param('periodId') periodId: string,
    @Body() updatePeriodsDto: UpdatePeriodsDto,
  ) {
    return this.hoursService.editPeriod(id, hourId, periodId, updatePeriodsDto);
  }
}
