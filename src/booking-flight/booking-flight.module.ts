import { Module } from '@nestjs/common';

import { BookingFlightRepository } from './booking-flight.repository';

@Module({
  providers: [BookingFlightRepository],
  exports: [BookingFlightRepository],
})
export class BookingFlightModule {}
