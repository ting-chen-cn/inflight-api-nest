import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PassengerService {
  constructor(private prisma: PrismaService) {}

  async getPassengersByFlight(flightNumber: string, departureDate: string) {
    const flight = await this.prisma.flight.findUnique({
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
    if (!flight) {
      throw new Error('Flight not found');
    }
    const bookingFlights = await this.prisma.bookingFlight.findMany({
      where: {
        flightId: flight.flightId,
      },
      select: {
        bookingId: true,
      },
    });
    if (bookingFlights.length === 0) {
      return [];
    }
    const bookingIds = bookingFlights.map((bf) => bf.bookingId);
    return await this.prisma.passenger.findMany({
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

  async getPassengerById(id: number) {
    const passenger = await this.prisma.passenger.findUnique({
      where: {
        passengerId: id,
      },
      select: {
        passengerId: true,
        firstName: true,
        lastName: true,
        email: true,
        bookingId: true,
      },
    });
    if (!passenger) {
      throw new Error('Passenger not found');
    }
    const bookingFlights = await this.prisma.bookingFlight.findMany({
      where: {
        bookingId: passenger.bookingId,
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

    return {
      ...passenger,
      flights: bookingFlights.map((bf) => bf.flight),
    };
  }
}
