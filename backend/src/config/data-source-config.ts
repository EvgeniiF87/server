import { join } from 'path';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

config({ path: join(process.cwd(), '.env') });

const options: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  schema: 'public',
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  database: process.env.TYPEORM_DATABASE,
  password: process.env.TYPEORM_PASSWORD,
  logging: true,
};

export default options;
