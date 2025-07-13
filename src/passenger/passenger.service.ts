import { Injectable } from '@nestjs/common';

import { PassengerSummary } from './entities/passenger-summary';
import { PassengerRepository } from './passenger.repository';
import { BookingRepository } from '../booking/booking.repository';
import { BookingFlightRepository } from '../booking-flight/booking-flight.repository';
import { FlightRepository } from '../flight/flight.repository';

@Injectable()
export class PassengerService {
  constructor(
    private readonly passengerRepo: PassengerRepository,
    private readonly bookingRepo: BookingRepository,
    private readonly flightRepo: FlightRepository,
    private readonly bookingFlightRepository: BookingFlightRepository,
  ) {}

  async getPassengersByFlight(
    flightNumber: string,
    departureDate: string,
  ): Promise<PassengerSummary[]> {
    const flight =
      await this.flightRepo.findFlightIdByFlightNumberAndDepartureDate(
        flightNumber,
        new Date(departureDate),
      );
    if (!flight) {
      return [];
    }
    const bookingFlights =
      await this.bookingFlightRepository.findBookingIdsByFlightId(
        flight.flightId,
      );
    if (bookingFlights.length === 0) {
      return [];
    }
    const bookingIds = bookingFlights.map((bf) => bf.bookingId);
    return await this.passengerRepo.getPassengersByBookingIds(bookingIds);
  }

  async getPassengerById(id: string) {
    const passenger = await this.passengerRepo.getPassengerById(id);
    if (!passenger) {
      return null;
    }
    const bookingFlights =
      await this.bookingFlightRepository.findBookingFlightsByBookingId(
        passenger.bookingId,
      );

    return {
      ...passenger,
      flights: bookingFlights.map((bf) => bf.flight),
    };
  }
}
