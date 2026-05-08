import mongoose from 'mongoose';

export const connectDB = async (mongoUri = process.env.MONGO_URI) => {
  if (!mongoUri) {
    throw new Error('MONGO_URI is required to connect to MongoDB.');
  }

  mongoose.set('strictQuery', true);
  const connection = await mongoose.connect(mongoUri);
  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
};
