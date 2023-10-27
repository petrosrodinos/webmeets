import { Body, Controller, Get, Patch, UseGuards, Param } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch(':id')
  editUser(@GetUser('_id') userId: string, @Param('id') id: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(id, dto);
  }
}
