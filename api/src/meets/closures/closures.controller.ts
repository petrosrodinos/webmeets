import { Controller, Post, Body, Patch, Param, UseGuards, Delete } from '@nestjs/common';
import { JwtGuard } from '../../auth/guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Meet } from 'src/schemas/meet.schema';
import { ClosuresService } from './closures.service';
import { CreateClosureDto } from './dto/create-closure.dto';
import { UpdateClosureDto } from './dto/update-closure.dto';

@Controller('meets/:id/closures')
@UseGuards(JwtGuard)
export class ClosuresController {
  constructor(private readonly closuresService: ClosuresService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  async create(@Param('id') id: string, @Body() createClosureDto: CreateClosureDto) {
    return await this.closuresService.create(id, createClosureDto);
  }

  @Patch(':closureId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  updatePeriod(@Param('id') id: string, @Param('closureId') closureId: string, @Body() updateClosureDto: UpdateClosureDto) {
    return this.closuresService.update(id, closureId, updateClosureDto);
  }

  @Delete(':closureId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Meet })
  deletePeriod(@Param('id') id: string, @Param('closureId') closureId: string) {
    return this.closuresService.remove(id, closureId);
  }
}
