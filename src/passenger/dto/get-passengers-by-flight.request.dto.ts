import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class GetPassengersByFlightRequestDto {
  @ApiProperty({
    example: 'AY157',
    description: 'Flight number (e.g., Finnair flight)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  flightNumber!: string;

  @ApiProperty({
    example: '2025-07-15',
    description: 'Departure date in yyyy-mm-dd format',
  })
  @IsDateString({ strict: true })
  @Length(10, 10, {
    message: 'Departure date must be in the format YYYY-MM-DD',
  })
  @IsNotEmpty()
  departureDate!: string;

  @ApiPropertyOptional({
    example: 'false',
    description: 'Only connecting flights',
  })
  @IsString()
  @IsOptional()
  onlyConnectingFlights?: string = 'false';
}
