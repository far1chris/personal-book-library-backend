// ref: 37aa88161f
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/books', booksRoutes);

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal_book_library';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Book library server is up and ready to roll');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
