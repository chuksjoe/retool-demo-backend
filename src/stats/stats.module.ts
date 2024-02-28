import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';

import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Driver, Assignment])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
