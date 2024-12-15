import 'dotenv/config';

export const {
  HOSTNAME = 'localhost',
  PORT = 3000,
  DATABASE_URL = 'postgresql://user:password@localhost:5432/pet-adopt'
} = process.env;
