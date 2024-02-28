export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface IEnvConfig {
  appPort: number;
  nodeEnv: string;
  database: IDatabaseConfig;
}

export function envConfig(): IEnvConfig {
  return {
    appPort: Number(process.env.APP_PORT),
    nodeEnv: <string>process.env.NODE_ENV,
    database: {
      host: <string>process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: <string>process.env.DATABASE_USERNAME,
      password: <string>process.env.DATABASE_PASSWORD,
      database: <string>process.env.DATABASE_NAME,
    },
  };
}
