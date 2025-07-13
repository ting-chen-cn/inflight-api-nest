import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PassengerSummary } from './entities/passenger-summary';

@Injectable()
export class PassengerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getPassengersByBookingIds(
    bookingIds: string[],
  ): Promise<PassengerSummary[]> {
    return this.prismaService.passenger.findMany({
      where: {
        bookingId: {
          in: bookingIds,
        },
      },
      select: {
        passengerId: true,
        firstName: true,
        lastName: true,
        bookingId: true,
      },
    });
  }

  async getPassengerById(id: string) {
    return this.prismaService.passenger.findUnique({
      where: {
        passengerId: id,
      },
      select: {
        passengerId: true,
        firstName: true,
        lastName: true,
        bookingId: true,
      },
    });
  }
}
