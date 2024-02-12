import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

interface IOrmConfig extends PostgresConnectionOptions {
  autoLoadEntities: boolean;
}

export const ormConfig: IOrmConfig = {
  type: 'postgres',
  host: 'dpg-cn2dm10l5elc73ebnokg-a.oregon-postgres.render.com',
  port: 5432,
  database: 'omini_db',
  username: 'omini_db_user',
  password: 'aKpwLA2GjjJu43Eae5c3os38rZP2sdIZ',
  synchronize: true,
  autoLoadEntities: true,
};
