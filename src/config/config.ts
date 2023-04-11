import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: parseInt(process.env.POSTGRES_USER, 10) || 5432,
    password: parseInt(process.env.POSTGRES_PASSWORD, 10) || 5432,
    database: parseInt(process.env.POSTGRES_DB, 10) || 5432,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    },
  },
});
