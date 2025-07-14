import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingFlightRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findBookingIdsByFlightId(flightId: number) {
    return await this.prismaService.bookingFlight.findMany({
      where: { flightId },
      select: {
        bookingId: true,
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
