
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from './Config/Database.js';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.DB_PORT;

// Updated CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log('App is listening and running in the backend');
});