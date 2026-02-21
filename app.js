import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import session from 'express-session';

import { connectDB } from './config/db.js';
import noteRoutes from './routes/noteRoutes.js';
import authRoutes from './routes/authRoutes.js';

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

app.use( // enable req.session in controllers
  session({
    secret: process.env.SESSION_SECRET, // secret used to sign the session cookie
    resave: false, // don't save session if nothing changed
    saveUninitialized: false // don't create empty sessions for anonymous visitors
  })
);

app.use((req, res, next) => { // make logged-in username available in all views for testing
  res.locals.currentUsername = req.session.username || null;
  next();
});

// Routes
app.use('/notes', noteRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => { 
  res.redirect('/notes'); // redirect base URL to notes list page
});


await connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
