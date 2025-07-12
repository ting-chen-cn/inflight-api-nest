import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.booking.create({
    data: {
      bookingId: 'AB1234',
      passengers: {
        create: [
          {
            passengerId: '1',
            firstName: 'Ting',
            lastName: 'Chen',
            email: 'ting@example.com',
          },
          {
            passengerId: '2',
            firstName: 'Chris',
            lastName: 'Lee',
            email: 'chris@example.com',
          },
        ],
      },
    },
  });

  const flight = await prisma.flight.create({
    data: {
      flightNumber: 'AY157',
      departureAirport: 'HEL',
      arrivalAirport: 'CDG',
      departureDate: new Date('2025-07-15'),
      arrivalDate: new Date('2025-07-15'),
    },
  });

  await prisma.bookingFlight.create({
    data: {
      bookingId: 'AB1234',
      flightId: flight.flightId,
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
