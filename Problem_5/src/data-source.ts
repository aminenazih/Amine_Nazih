import { DataSource } from 'typeorm';
import { Resource } from './entities/Resource'; 

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Resource], 
  synchronize: true,
  logging: true,
});
