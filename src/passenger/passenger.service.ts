import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PassengerRepository } from './passenger.repository';
import { BookingFlightRepository } from '../booking-flight/booking-flight.repository';
import { FlightRepository } from '../flight/flight.repository';
import { GetPassengerByIdResponseDto } from './dto/get-passenger-by-id.response.dto';
import { GetPassengerSummaryResponseDto } from './dto/get-passenger-summary.response.dto';
import { BookingRepository } from '../booking/booking.repository';
import { FlightDetailsDto } from '../flight/entities/flight';

@Injectable()
export class PassengerService {
  constructor(
    private readonly passengerRepo: PassengerRepository,
    private readonly flightRepo: FlightRepository,
    private readonly bookingFlightRepository: BookingFlightRepository,
    private readonly bookingRepo: BookingRepository,
  ) {}

  async getPassengersByFlight(
    flightNumber: string,
    departureDate: string,
    onlyConnectingFlights: string = 'false',
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
    // If onlyConnectingFlights is true, filter out the flight with the given flightNumber
    const bookingIds = bookingFlights.map((bf) => bf.bookingId);
    let bookings = await Promise.all(
      bookingIds.map((id) => {
        return this.bookingRepo.findBookingById(id);
      }),
    );

    if (onlyConnectingFlights === 'true') {
      bookings = bookings.filter((booking) => {
        const flights = booking?.flights.map((bf) => bf.flight) || [];
        return this.checkIfFlightsIsConnecting(flights);
      });
    }
    const passenger = await this.passengerRepo.getPassengersByBookingIds(
      bookings.map((b) => b?.id || '') || [],
    );
    return plainToInstance(GetPassengerSummaryResponseDto, passenger);
  }

  checkIfFlightsIsConnecting(flights: FlightDetailsDto[]): boolean {
    const isLengthGreaterThanOne = flights.length > 1;
    const doAirportsMatch = flights.every(
      (flight, index, arr) =>
        index === 0 ||
        flight.departureAirport === arr[index - 1].arrivalAirport,
    );
    const doDatesMatch = flights.every(
      (flight, index, arr) =>
        index === 0 ||
        flight.departureDate.getDate() === arr[index - 1].arrivalDate.getDate(),
    );
    return isLengthGreaterThanOne && doAirportsMatch && doDatesMatch;
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
