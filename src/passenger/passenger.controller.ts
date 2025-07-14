import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { GetPassengerByIdResponseDto } from './dto/get-passenger-by-id.response.dto';
import { GetPassengerSummaryResponseDto } from './dto/get-passenger-summary.response.dto';
import { GetPassengersByFlightRequestDto } from './dto/get-passengers-by-flight.request.dto';
import { PassengerService } from './passenger.service';
import { ExceptionDto } from '../common/dto/exception.dto';

@ApiTags('Passenger')
@ApiBearerAuth('Access Token')
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
    type: ExceptionDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.',
    type: ExceptionDto,
  })
  async getByFlight(
    @Query()
    query: GetPassengersByFlightRequestDto,
  ) {
    const { flightNumber, departureDate } = query;

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
    example: '1',
    format: 'int32',
  })
  @ApiNotFoundResponse({
    description: 'Passenger not found.',
    type: ExceptionDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid passenger ID format.',
    type: ExceptionDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.',
    type: ExceptionDto,
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const passenger = await this.passengerService.getPassengerById(id);
    if (passenger === null) {
      throw new NotFoundException('Passenger not found');
    }
    return passenger;
  }
}
