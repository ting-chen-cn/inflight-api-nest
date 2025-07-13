import { Expose } from 'class-transformer';

export class Booking {
  @Expose({ name: 'id' })
  bookingId!: string;
}
