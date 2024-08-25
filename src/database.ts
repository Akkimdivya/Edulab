import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '74.207.234.212',
  port: 5432,
  username: 'postgres',
  password: "divi123", 
  database: 'postgres',
  synchronize: true,
  entities: [__dirname + '/entities/*.ts'],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};
