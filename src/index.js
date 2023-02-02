import dotenv from "dotenv";
import express, { json } from "express";

import { connect } from "./db.js";
import { getBooks, addBook } from "./features/book/index.js";
import { addAuthor } from "./features/author/index.js";

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

app.post("/author", async (req, res) => {
  const { name } = req.body;
  const author = await addAuthor({ name });
  return res.json(author);
});

app.listen(3000);
