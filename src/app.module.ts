import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { APP_FILTER } from '@nestjs/core';
// import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { DriversModule } from './drivers/drivers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { TypeOrmConfigModule } from './configs/ormConfig';
import { envConfig } from './configs/envConfig';
import { StatsModule } from './stats/stats.module';
import envValidationSchema from './common/validation/envValidationSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [envConfig],
      expandVariables: true,
      validationSchema: envValidationSchema,
    }),
    TypeOrmConfigModule,
    DriversModule,
    VehiclesModule,
    AssignmentsModule,
    StatsModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}
