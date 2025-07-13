import { Expose, Transform } from 'class-transformer';

export class GetPassengerByIdResponseDto {
  @Expose({ name: 'id' })
  @Transform(({ value }) => String(value))
  passengerId!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  bookingId!: string;
  flights!: FlightDetailsDto[];
}

export class FlightDetailsDto {
  flightNumber!: string;
  departureAirport!: string;
  arrivalAirport!: string;
  departureDate!: Date;
  arrivalDate!: Date;
}
