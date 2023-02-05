import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Author",
  },
  publishedAt: Number,
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);

export const getBooks = () => {
  return Book.find({}).populate("author");
};

export const addBook = async ({ title, author, publishedAt }) => {
  const book = await Book.create({ title, author, publishedAt });
  return book;
};

export const removeBook = (id) => Book.findByIdAndDelete(id);

export const updateBook = async (id, { title, author, publishedAt }) => {
  const book = await Book.findById(id);

  if (title) {
    book.title = title;
  }

  if (author) {
    book.author = author;
  }

  if (publishedAt) {
    book.publishedAt = publishedAt;
  }

  return book.save();
};
