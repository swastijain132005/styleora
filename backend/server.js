import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authrouter from './routes/auth.routes.js';
import wishlistRoutes from './routes/wish.routes.js';

import recommendRoutes from './routes/recommend.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

const allowedOrigins = [
  "https://styleora-mr50.onrender.com",
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
app.use("/api/wishlist",wishlistRoutes);

app.get("/api/auth/check", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ authenticated: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ authenticated: true });
  } catch {
    return res.json({ authenticated: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});