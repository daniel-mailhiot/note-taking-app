import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import methodOverride from 'method-override';

import { connectDB } from './config/db.js';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();

const app = express();

// View engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); 
app.use(express.static('public'));
app.use(cors());

// Routes
app.use('/notes', noteRoutes);


await connectDB(process.env.MONGO_URI);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});