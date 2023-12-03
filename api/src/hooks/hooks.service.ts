import { Injectable } from '@nestjs/common';
import { CreateHookDto } from './dto/create-hook.dto';
import { UpdateHookDto } from './dto/update-hook.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HooksService {
  constructor(private config: ConfigService) {}
  create(createHookDto: CreateHookDto) {
    return `This action adds a new hook`;
  }

  findAll() {
    return `This action returns all hooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hook`;
  }

  update(id: number, updateHookDto: UpdateHookDto) {
    return `This action updates a #${id} hook`;
  }

  remove(id: number) {
    return `This action removes a #${id} hook`;
  }
}
