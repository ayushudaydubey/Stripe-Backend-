import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './src/routes/productRoutes.js';

dotenv.config();

const app = express();


app.use(cors({
  origin: ['http://localhost:5173', 'https://stripe-frontend-sooty.vercel.app'],
  credentials: true,
}));

app.use(express.json());


app.use('/', productRoutes);



app.listen(3000, () => {
  console.log(` Server is running `);
});
