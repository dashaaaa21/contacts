const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  const uriMissing = !mongoUri;

  if (uriMissing) {
    throw new Error('MONGO_URI is not defined');
  }

  try {
    await mongoose.connect(mongoUri);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error', error);

    throw error;
  }
};

module.exports = connectDB;

