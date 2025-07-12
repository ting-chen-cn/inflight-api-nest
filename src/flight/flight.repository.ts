import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FlightRepository {
  constructor(
    private readonly prismaService: PrismaService, // Assuming PrismaService is imported from the correct path
  ) {}

  async findFlightIdByFlightNumberAndDepartureDate(
    flightNumber: string,
    departureDate: Date,
  ): Promise<{ flightId: number } | null> {
    return await this.prismaService.flight.findUnique({
      where: {
        flight_by_number_and_date: {
          flightNumber,
          departureDate: new Date(departureDate),
        },
      },
      select: {
        flightId: true,
      },
    });
  }
}
