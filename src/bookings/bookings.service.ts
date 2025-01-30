import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prismaService/prisma.service';

@Injectable()
export class BookingsService {

  constructor(private prismaService: PrismaService) { }


  async create(userId: number, createBookingDto: CreateBookingDto) {
    try {
      const booking = await this.prismaService.booking.create({
        data: {
          ticketType: createBookingDto.ticketType || 'pending',
          quantity: createBookingDto.quantity,
          status: createBookingDto.status || 'pending',
          userId: userId,
          eventId: createBookingDto.eventId,
        },
      });
      return booking;
    } catch (error) {
      throw new InternalServerErrorException('Error creating booking');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.booking.findMany({
        include: {
          user: true,  // Optionally include related user data
          event: true,  // Optionally include related event data
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching bookings');
    }
  }



  async findOne(id: number) {
    try {
      return await this.prismaService.booking.findUnique({
        where: { id },
        include: {
          user: true,
          event: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
  }



  async update(id: number, updateBookingDto: UpdateBookingDto) {
    try {
      const updatedBooking = await this.prismaService.booking.update({
        where: { id },
        data: updateBookingDto,
      });
      return updatedBooking;
    } catch (error) {
      throw new InternalServerErrorException('Error updating booking');
    }
  }

  async remove(id: number) {
    try {
      const removedBooking = await this.prismaService.booking.delete({
        where: { id },
      });
      return removedBooking;
    } catch (error) {
      throw new InternalServerErrorException('Error removing booking');
    }
  }
}
