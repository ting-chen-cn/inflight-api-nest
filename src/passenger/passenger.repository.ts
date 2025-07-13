import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PassengerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getPassengersByBookingIds(bookingIds: string[]) {
    return this.prismaService.passenger.findMany({
      where: {
        bookingId: {
          in: bookingIds,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bookingId: true,
      },
    });
  }

  async getPassengerById(id: number) {
    return this.prismaService.passenger.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bookingId: true,
        email: true,
      },
    });
  }
}
