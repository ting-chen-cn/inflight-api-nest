import { Expose, Transform } from 'class-transformer';

export class GetPassengerSummaryResponseDto {
  @Expose({ name: 'id' })
  @Transform(({ value }) => String(value))
  passengerId!: string;
  firstName!: string;
  lastName!: string;
  bookingId!: string;
}
