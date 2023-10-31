import { Injectable } from '@nestjs/common';
import { CreateMeetDto } from './dto/create-meet.dto';
import { UpdateMeetDto } from './dto/update-meet.dto';

@Injectable()
export class MeetService {
  create(createMeetDto: CreateMeetDto) {
    return 'This action adds a new meet';
  }

  findAll() {
    return `This action returns all meet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meet`;
  }

  update(id: number, updateMeetDto: UpdateMeetDto) {
    return `This action updates a #${id} meet`;
  }

  remove(id: number) {
    return `This action removes a #${id} meet`;
  }
}
