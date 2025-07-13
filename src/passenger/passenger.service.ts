import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PassengerRepository } from './passenger.repository';
import { BookingFlightRepository } from '../booking-flight/booking-flight.repository';
import { FlightRepository } from '../flight/flight.repository';
import { GetPassengerByIdResponseDto } from './dto/get-passenger-by-id.response.dto';
import { GetPassengerSummaryResponseDto } from './dto/get-passenger-summary.response.dto';

@Injectable()
export class PassengerService {
  constructor(
    private readonly passengerRepo: PassengerRepository,
    private readonly flightRepo: FlightRepository,
    private readonly bookingFlightRepository: BookingFlightRepository,
  ) {}

  async getPassengersByFlight(
    flightNumber: string,
    departureDate: string,
  ): Promise<GetPassengerSummaryResponseDto[]> {
    const flight = await this.flightRepo.findIdByFlightNumberAndDepartureDate(
      flightNumber,
      new Date(departureDate),
    );
    if (!flight) {
      return [];
    }
    const bookingFlights =
      await this.bookingFlightRepository.findBookingIdsByFlightId(flight.id);
    if (bookingFlights.length === 0) {
      return [];
    }
    const bookingIds = bookingFlights.map((bf) => bf.bookingId);
    const passenger =
      await this.passengerRepo.getPassengersByBookingIds(bookingIds);
    return plainToInstance(GetPassengerSummaryResponseDto, passenger);
  }

  async getPassengerById(id: number) {
    const passenger = await this.passengerRepo.getPassengerById(id);
    if (!passenger) {
      return null;
    }
    const bookingFlights =
      await this.bookingFlightRepository.findBookingFlightsByBookingId(
        passenger.bookingId,
      );
    return plainToInstance(GetPassengerByIdResponseDto, {
      ...passenger,
      flights: bookingFlights.map((bf) => bf.flight),
    });
  }
}
