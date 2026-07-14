// ref: 37aa88161f
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// GET /api/books (Public route)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Server error occurred while fetching books" });
  }
});

// POST /api/books (Protected route)
router.post('/', auth, async (req, res) => {
  const { title, author, description, publishedYear, genre } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and Author are required fields" });
  }

  try {
    const newBook = new Book({
      title,
      author,
      description,
      publishedYear,
      genre
    });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ error: "Server error occurred while saving the book" });
  }
});

// DELETE /api/books/:id (Protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error occurred while deleting the book" });
  }
});

module.exports = router;
