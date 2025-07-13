import { Module } from '@nestjs/common';

import { PassengerController } from './passenger.controller';
import { PassengerRepository } from './passenger.repository';
import { PassengerService } from './passenger.service';
import { BookingModule } from '../booking/booking.module';
import { BookingFlightModule } from '../booking-flight/booking-flight.module';
import { FlightModule } from '../flight/flight.module';

@Module({
  imports: [BookingModule, FlightModule, BookingFlightModule],
  controllers: [PassengerController],
  providers: [PassengerService, PassengerRepository],
})
export class PassengerModule {}
