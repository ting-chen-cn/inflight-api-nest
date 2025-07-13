import { Expose, Transform } from 'class-transformer';

export class Flight {
  @Expose({ name: 'id' })
  @Transform(({ value }) => String(value))
  flightId!: string;

  @Expose({ name: 'flightNumber' })
  flightNumber!: string;

  @Expose({ name: 'departureAirport' })
  departureAirport!: string;

  @Expose({ name: 'arrivalAirport' })
  arrivalAirport!: string;

  @Expose({ name: 'departureDate' })
  departureDate!: Date;

  @Expose({ name: 'arrivalDate' })
  arrivalDate!: Date;
}
