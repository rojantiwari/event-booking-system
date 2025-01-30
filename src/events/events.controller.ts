import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtGuard } from 'src/users/guard';
import { GetUser } from 'src/users/decorator';
import { User } from '@prisma/client';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @UseGuards(JwtGuard)
  @Post('create')
  create(@GetUser() user: User, @Body() createEventDto: CreateEventDto) {
    if (user.role == 'attendee' || user.role == 'admin') {
      throw new Error(`This provided user ${user.name} doesnot have credential to create event`)
    }


    return this.eventsService.create(user.id, createEventDto);
  }

  @Get('findallevents')
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('findevent/:id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @UseGuards(JwtGuard)
  @Delete('deleteevents')
  remove(@Param('id') id: string, @GetUser() user: User) {
    if (user.role == 'attendee') {
      throw new BadRequestException('You does not have credential to delete')
    }
    return this.eventsService.remove(+id);
  }
}
