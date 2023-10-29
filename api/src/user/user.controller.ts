import { Body, Controller, Get, Patch, UseGuards, Param, Req } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { JwtGuard } from '../auth/guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('user')
@ApiTags('User')
@ApiOkResponse({ type: User })
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@Req() req: Express.Request) {
    const userId = req.user.userId;

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
