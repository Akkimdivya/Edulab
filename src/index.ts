import 'reflect-metadata';
import express from 'express';
import { initializeDatabase } from './database';
import eventRoutes from './routes/EventRoutes';

const app = express();
app.use(express.json());

app.use('/api', eventRoutes);

const startServer = async () => {
  await initializeDatabase();
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
};

startServer();
