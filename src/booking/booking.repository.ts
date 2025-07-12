import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Booking } from './entities/booking';

@Injectable()
export class BookingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findBookingById(id: string): Promise<Booking | null> {
    return this.prismaService.booking.findUnique({
      where: {
        bookingId: id,
      },
      select: {
        bookingId: true,
      },
    });
  }
}
