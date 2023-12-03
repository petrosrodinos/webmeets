import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { HooksService } from './hooks.service';
import { CreateHookDto } from './dto/create-hook.dto';
import { UpdateHookDto } from './dto/update-hook.dto';
import { ConfigService } from '@nestjs/config';

@Controller('hooks')
export class HooksController {
  constructor(private readonly hooksService: HooksService) {}

  @Post()
  create(@Body() createHookDto: CreateHookDto, @Request() request: any) {
    const event = request.body;

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return {
      received: true,
    };
  }

  @Get()
  findAll() {
    return this.hooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHookDto: UpdateHookDto) {
    return this.hooksService.update(+id, updateHookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hooksService.remove(+id);
  }
}
