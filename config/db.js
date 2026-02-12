import mongoose from 'mongoose';

export const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message); // Using console.error and exit code 1 instead of console.log for better error handling
    process.exit(1);                                         // (Not sure if we covered these in class but I wanted to try it)
  }
};