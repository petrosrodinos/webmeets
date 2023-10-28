import { Body, Controller, Get, Patch, UseGuards, Param } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('User')
@ApiOkResponse({ type: User })
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  editUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
