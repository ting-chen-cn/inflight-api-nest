import { Module } from '@nestjs/common';
import { PassengerModule } from './passenger/passenger.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PassengerModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
