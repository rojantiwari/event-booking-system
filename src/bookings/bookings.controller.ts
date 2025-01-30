import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtGuard } from 'src/users/guard';
import { GetUser } from 'src/users/decorator';
import { User } from '@prisma/client';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }


  @UseGuards(JwtGuard)
  @Post('create')
  async create(
    @GetUser()
    user: User,
    @Body()
    createBookingDto: CreateBookingDto) {
    try {
      const booking = await this.bookingsService.create(user.id, createBookingDto);
      return booking;
    } catch (error) {
      throw new InternalServerErrorException('Error creating booking');
    }
  }

  @Get('findbooking')
  async findAll() {
    try {
      const bookings = await this.bookingsService.findAll();
      return bookings;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching bookings');
    }
  }

  @Get('findbooking/:id')
  async findOne(@Param('id') id: string) {
    try {
      const booking = await this.bookingsService.findOne(+id);
      if (!booking) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }
      return booking;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching booking');
    }
  }

  @UseGuards(JwtGuard)
  @Patch('updatebooking/:id')
  async update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    try {
      const updatedBooking = await this.bookingsService.update(+id, updateBookingDto);
      if (!updatedBooking) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }
      return updatedBooking;
    } catch (error) {
      throw new InternalServerErrorException('Error updating booking');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const removedBooking = await this.bookingsService.remove(+id);
      if (!removedBooking) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }
      return { message: 'Booking removed successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error removing booking');
    }
  }
}
