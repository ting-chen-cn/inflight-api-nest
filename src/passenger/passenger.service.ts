import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PassengerRepository } from './passenger.repository';
import { BookingFlightRepository } from '../booking-flight/booking-flight.repository';
import { FlightRepository } from '../flight/flight.repository';
import { GetPassengerByIdResponseDto } from './dto/get-passenger-by-id.response.dto';
import { GetPassengerSummaryResponseDto } from './dto/get-passenger-summary.response.dto';
import { BookingRepository } from '../booking/booking.repository';
import { FlightDetailsDto } from '../flight/entities/flight';

const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds'

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

    let bookings = await this.bookingRepo.findBookingsByIds(
      bookingFlights.map((bf) => bf.bookingId),
    );

    const filterConnected = onlyConnectingFlights === 'true';
    if (filterConnected) {
      bookings = bookings.filter((booking) => {
        const flights = booking?.flights.map((bf) => bf.flight) || [];
        return this.checkIfFlightsIsConnecting(flights);
      });
    }
    const passengers = bookings.flatMap(
      (booking) =>
        booking.passengers.map((passenger) => ({
          ...passenger,
        })) ?? [],
    );
    return plainToInstance(GetPassengerSummaryResponseDto, passengers);
  }

  checkIfFlightsIsConnecting(flights: FlightDetailsDto[]): boolean {
    if (flights.length < 2) return false;

    const minLayoverTime = 2 * ONE_HOUR; // 2 hours in milliseconds
    const maxLayoverTime = 24 * ONE_HOUR; // 24 hours in milliseconds

    const sortedFlights = flights.sort(
      (a, b) => a.departureDate.getTime() - b.departureDate.getTime(),
    );

    // will return true only if all flight pairs in the sorted list to be connected correctly
    return sortedFlights
      .slice(0, -1) // All flights except the last one
      .every((flight, index) => {
        const nextFlight = sortedFlights[index + 1];
        const airportsMatch =
          flight.arrivalAirport === nextFlight.departureAirport;
        const layoverTime =
          nextFlight.departureDate.getTime() - flight.arrivalDate.getTime();

        return (
          airportsMatch &&
          layoverTime >= minLayoverTime &&
          layoverTime <= maxLayoverTime
        );
      });
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
