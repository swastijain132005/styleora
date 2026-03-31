import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authrouter from './routes/auth.routes.js';

import recommendRoutes from './routes/recommend.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173","http://localhost:3000","http://localhost:5000"
];


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));


const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authrouter);
app.use('/api', recommendRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});