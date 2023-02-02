import mongoose from "mongoose";

const { Schema } = mongoose;

const authorSchema = new Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
});

const Author = mongoose.model("Author", authorSchema);

export const addAuthor = ({ name }) => {
  return Author.create({ name });
};
