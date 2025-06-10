import mongoose from 'mongoose';

export const connectDb = async () => {
  const uri = process.env.DB_URI as string;
  if (!uri) throw new Error('DB_URI is not defined');
  await mongoose.connect(uri);
};
