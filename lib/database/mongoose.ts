/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  // Log to check if the function is called
  console.log("connectToDatabase called");

  // Check if there's already a cached connection
  if (cached.conn) {
    console.log("Using cached connection");
    return cached.conn;
  }

  // Log when no cached connection is found
  console.log("No cached connection. Trying to connect...");

  // Check if the MongoDB URL is present
  if (!MONGODB_URL) {
    throw new Error('Missing MONGODB_URL');
  }

  // Log when attempting to create a new connection
  console.log("Creating a new connection to MongoDB...");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'imaginify',
      bufferCommands: false,
    });

  // Await the connection and log once connected
  cached.conn = await cached.promise;
  console.log("MongoDB connected");

  return cached.conn;
};
