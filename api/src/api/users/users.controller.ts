import { Body, Controller, Get, Patch, UseGuards, Req, Query, ForbiddenException, Param } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { JwtGuard } from '../auth/guard';
import { UpdateUserDto } from './dto';
import { UserService } from './users.service';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('User')
@ApiOkResponse({ type: User })
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @ApiOkResponse({ type: [User] })
  @ApiBearerAuth()
  findAll(@Req() req: Express.Request, @Query() query: any) {
    const { profileId } = req.user;
    if (!profileId) {
      return new ForbiddenException('You are not allowed to access this resource');
    }
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Express.Request) {
    const userId = req.user.userId;

    if (id !== userId) {
      return new ForbiddenException('You are not allowed to access this resource');
    }

    return this.userService.findOne(userId);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  editUser(@Req() req: Express.Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId;
    return this.userService.update(userId, updateUserDto);
  }
}
