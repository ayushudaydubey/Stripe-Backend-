import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import productRoutes from './src/routes/productRoutes.js'

const app = express();
app.use(cors({
origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use("/",productRoutes)

app.listen(3000,()=>{
  console.log("Server is running....!");
  
})


