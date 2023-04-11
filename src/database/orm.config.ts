import 'dotenv/config';
import { DataSource } from 'typeorm';

export const ormConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};
export const dataSource = new DataSource({
  ...ormConfig,
  type: 'postgres',
  migrations: ['src/database/migrations/*{.ts,.js}'],
  entities: ['src/database/entities/*.entity{.ts,.js}'],
});

export default {
  ...ormConfig,
  seeds: ['src/database/seeds/*{.ts,.js}'],
  factories: ['src/database/factories/*{.ts,.js}'],
};
