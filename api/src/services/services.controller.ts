import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { UserService } from 'src/user/user.service';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Service } from 'src/schemas/service.schema';

@Controller('service')
@ApiTags('Service')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: Service })
  async create(@GetUser('profileId') profileId: string, @Body() createServiceDto: CreateServiceDto) {
    let profileid = profileId;
    if (!profileId) {
      const user = await this.userService.findOne(profileId);
      profileid = user.profileId.toString();
    }
    return this.servicesService.create(profileid, createServiceDto);
  }

  @Get()
  @ApiOkResponse({ type: Service, isArray: true })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Service })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Service })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
