import { Module } from '@nestjs/common';

import { FlightRepository } from './flight.repository';

@Module({
  providers: [FlightRepository],
  exports: [FlightRepository],
})
export class FlightModule {}
