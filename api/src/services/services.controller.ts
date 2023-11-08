import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtGuard } from '../auth/guard';
import { UserService } from 'src/user/user.service';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Service } from 'src/schemas/service.schema';
import { AnyFilesInterceptor, FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('service')
@ApiTags('Service')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  // @UseInterceptors(FileInterceptor('banner'))
  // @UseInterceptors(FilesInterceptor('certificates'))
  // @UseInterceptors(FileInterceptor('banner'), FilesInterceptor('certificates'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: Service })
  async create(
    @Req() req: Express.Request,
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { userId, profileId } = req.user;
    let profileid = profileId;
    if (!profileid) {
      const user = await this.userService.findOne(userId);
      profileid = user.profileId._id.toString();
    }

    return this.servicesService.create(userId, profileid, createServiceDto, files);
  }

  @Get()
  @ApiOkResponse({ type: Service, isArray: true })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Service })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Service })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
