import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION generate_booking_id()
    RETURNS CHAR(6) AS $$
    DECLARE
      chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      result TEXT := '';
    BEGIN
      FOR i IN 1..6 LOOP
        result := result || substr(chars, (floor(random() * length(chars)) + 1)::int, 1);
      END LOOP;
      RETURN result;
    END;
    $$ LANGUAGE plpgsql;
  `);
  } catch (error) {
    console.error('Error creating function:', error);
  }

  const booking1 = await prisma.booking.create({
    data: {
      passengers: {
        create: [
          {
            firstName: 'Ting',
            lastName: 'Chen',
            email: 'ting@example.com',
          },
          {
            firstName: 'Chris',
            lastName: 'Lee',
            email: 'chris@example.com',
          },
        ],
      },
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      passengers: {
        create: [
          {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@examp.com',
          },
        ],
      },
    },
  });

  const flight1 = await prisma.flight.create({
    data: {
      flightNumber: 'AY157',
      departureAirport: 'HEL',
      arrivalAirport: 'ARN',
      departureDate: new Date('2025-07-15'),
      arrivalDate: new Date('2025-07-15'),
    },
  });
  const flight2 = await prisma.flight.create({
    data: {
      flightNumber: 'AY158',
      departureAirport: 'ARN',
      arrivalAirport: 'HEL',
      departureDate: new Date('2025-07-16'),
      arrivalDate: new Date('2025-07-16'),
    },
  });

  await prisma.bookingFlight.createMany({
    data: [
      {
        bookingId: booking1.id,
        flightId: flight1.id,
      },
      {
        bookingId: booking1.id,
        flightId: flight2.id,
      },
      {
        bookingId: booking2.id,
        flightId: flight1.id,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
