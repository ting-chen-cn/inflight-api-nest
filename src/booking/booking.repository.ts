import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findBookingsByIds(ids: string[]) {
    return this.prismaService.booking.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        passengers: true,
        flights: {
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
        },
      },
    });
  }
}
