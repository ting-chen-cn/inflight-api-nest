import { Module } from '@nestjs/common';

import { BookingRepository } from './booking.repository';

@Module({
  providers: [BookingRepository],
  exports: [BookingRepository],
})
export class BookingModule {}
