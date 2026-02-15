import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import methodOverride from 'method-override';

import { connectDB } from './config/db.js';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); 
app.use(express.static('public'));
app.use(cors());

// Routes
app.use('/notes', noteRoutes);

app.get('/', (req, res) => { 
  res.redirect('/notes'); // redirect base URL to notes list page
});


await connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
