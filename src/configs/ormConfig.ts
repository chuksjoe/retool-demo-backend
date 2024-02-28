import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig, IEnvConfig } from './envConfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<IEnvConfig, true>) => {
        const database: IDatabaseConfig = config.get('database');

        return {
          ...database,
          type: 'postgres',
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class TypeOrmConfigModule {}
