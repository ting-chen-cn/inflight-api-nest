import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { GetPassengerByIdResponseDto } from './dto/get-passenger-by-id.response.dto';
import { GetPassengerSummaryResponseDto } from './dto/get-passenger-summary.response.dto';
import { GetPassengersByFlightRequestDto } from './dto/get-passengers-by-flight.request.dto';
import { PassengerService } from './passenger.service';
import { BadRequestDto } from '../common/dto/bad-request.dto';

@ApiTags('Passenger')
@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Get()
  @ApiOperation({
    summary: 'Get passengers by flight number and departure date',
    description:
      'Retrieves a list of passengers for a specific flight based on flight number and departure date.',
    operationId: 'getPassengersByFlight',
    tags: ['Passenger'],
  })
  @ApiQuery({
    name: 'flightNumber',
    required: true,
    description: 'Flight number of the flight to get passengers for.',
    type: String,
  })
  @ApiQuery({
    name: 'departureDate',
    required: true,
    description: 'Departure date of the flight to get passengers for.',
    type: String,
    format: 'date',
  })
  @ApiOkResponse({
    description: 'List of passengers for the specified flight.',
    type: GetPassengerSummaryResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request parameters.',
    type: BadRequestDto,
  })
  async getByFlight(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        exceptionFactory: (errors) => new BadRequestException(errors),
        forbidUnknownValues: true,
      }),
    )
    query: GetPassengersByFlightRequestDto,
  ) {
    const { flightNumber, departureDate } = query;

    if (!flightNumber || !departureDate) {
      throw new BadRequestException(
        'Both flightNumber and departureDate are required.',
      );
    }

    return this.passengerService.getPassengersByFlight(
      flightNumber,
      departureDate,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get passenger by ID',
    description:
      'Retrieves detailed information about a specific passenger by their ID.',
    operationId: 'getPassengerById',
    tags: ['Passenger'],
  })
  @ApiOkResponse({
    description: 'Detailed information about the passenger.',
    type: GetPassengerByIdResponseDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the passenger to retrieve.',
    type: String,
  })
  async getById(@Param('id') id: string) {
    return this.passengerService.getPassengerById(id);
  }
}
