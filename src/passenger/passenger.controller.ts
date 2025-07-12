import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { PassengerService } from './passenger.service';

@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Get()
  async getByFlight(
    @Query('flightNumber') flightNumber: string,
    @Query('departureDate') departureDate: string,
  ) {
    if (!flightNumber || !departureDate) {
      throw new BadRequestException('Missing flightNumber or departureDate');
    }
    return this.passengerService.getPassengersByFlight(
      flightNumber,
      departureDate,
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.passengerService.getPassengerById(parseInt(id, 10));
  }
}
