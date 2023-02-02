import mongoose from "mongoose";

export const connect = () => {
  return mongoose.connect(
    `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?authSource=${process.env.DATABASE_AUTH_SOURCE}`
  );
};
