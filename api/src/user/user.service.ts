import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async editUser(userId: string, data: EditUserDto) {
    const user = await this.userModel.findByIdAndUpdate(userId, { $set: data }, { new: true }).exec();

    if (user) {
      user.password = undefined;
      return user.toObject();
    }

    throw new Error('User not found or update failed');
  }
}
