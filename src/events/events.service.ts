import { BadRequestException, Injectable } from '@nestjs/common';
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
      where: { id: id }
    });
  }


  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
