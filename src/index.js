import dotenv from "dotenv";
import express, { json } from "express";

import { connect } from "./db.js";
import {
  getBooks,
  addBook,
  removeBook,
  updateBook,
} from "./features/book/index.js";
import { addAuthor, getAuthors } from "./features/author/index.js";

dotenv.config();

await connect();

const app = express();

app.use(json());

app.get("/books", async (req, res) => {
  const books = await getBooks();
  return res.json(books);
});

app.post("/books", async (req, res) => {
  const { title, author, publishedAt } = req.body;
  const book = await addBook({ title, author, publishedAt });
  return res.json(book);
});

app.put("/books/:id", async (req, res) => {
  const { title, author, publishedAt } = req.body;
  const { id } = req.params;

  const book = await updateBook(id, { title, author, publishedAt });
  return res.json(book);
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  await removeBook(id);
  return res.sendStatus(200);
});

app.get("/author", async (req, res) => {
  const authors = await getAuthors();
  return res.json(authors);
});

app.post("/author", async (req, res) => {
  const { name } = req.body;
  const author = await addAuthor({ name });
  return res.json(author);
});

app.listen(3000);
