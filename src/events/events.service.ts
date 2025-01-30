import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prismaService/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) { }


  async create(userIds: number, createEventDto: CreateEventDto) {

    const existingEvent = await this.prismaService.event.findFirst({
      where: {
        date: createEventDto.date,
        location: createEventDto.location
      }
    })

    if (existingEvent) {
      throw new BadRequestException('An event already exists at this date and location');
    }

    const newEvent = await this.prismaService.event.create({
      data: {
        title: createEventDto.title,
        description: createEventDto.description,
        date: createEventDto.date,
        location: createEventDto.location,
        status: createEventDto.status || 'pending', // Default to pending if not provided
        userId: userIds, // Ensure userId is included in the DTO
      }
    })
    return newEvent
  }


  findAll() {
    return this.prismaService.event.findMany({ include: { user: true } });
  }


  findOne(id: number) {
    return this.prismaService.event.findUnique({
      where: { id }
    });
  }


  async update(id: number, updateEventDto: UpdateEventDto) {

    try {
      const updateEvent = await this.prismaService.event.update({
        where: { id },
        data: updateEventDto,
      });
      return updateEvent;

    } catch (error) {
      throw new InternalServerErrorException('Error updating booking');
    }
  }


  async remove(id: number) {
    try {
      const removedBooking = await this.prismaService.event.delete({
        where: { id },
      });
      return removedBooking;
    } catch (error) {
      throw new InternalServerErrorException('Error removing event');
    }
  }
}
