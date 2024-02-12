import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriversModule } from './drivers/drivers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ormConfig } from './configs/ormConfig';
// import { APP_FILTER } from '@nestjs/core';
// import { HttpExceptionFilter } from './common/filter/http-exception.filter';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), DriversModule, VehiclesModule, AssignmentsModule],
  controllers: [],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}
