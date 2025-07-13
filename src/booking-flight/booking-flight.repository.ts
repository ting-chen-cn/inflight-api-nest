import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Booking } from './entities/booking';

@Injectable()
export class BookingFlightRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findBookingIdsByFlightId(flightId: number): Promise<Booking[]> {
    return await this.prismaService.bookingFlight.findMany({
      where: { flightId },
      select: { bookingId: true },
    });
  }

  async findBookingFlightsByBookingId(bookingId: string) {
    return await this.prismaService.bookingFlight.findMany({
      where: {
        bookingId: bookingId,
      },
      select: {
        flight: {
          select: {
            flightNumber: true,
            departureAirport: true,
            arrivalAirport: true,
            departureDate: true,
            arrivalDate: true,
          },
        },
      },
    });
  }
}
