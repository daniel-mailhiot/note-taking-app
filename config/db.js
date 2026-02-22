import mongoose from 'mongoose';

export const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // stop the server if DB is unavailable since the app cannot function correctly without DB (Not sure if we covered this in class but I wanted to try it)
  }
};