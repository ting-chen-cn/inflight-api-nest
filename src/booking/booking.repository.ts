import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findBookingById(id: string) {
    return this.prismaService.booking.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });
  }
}
