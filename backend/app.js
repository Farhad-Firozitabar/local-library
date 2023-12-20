const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// GET all books
app.get('/books', (req, res) => {
  const { sortBy } = req.query;
  const books = db.getBooks(sortBy);
  res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  const books = db.getBooks();
  newBook.id = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  books.push(newBook);
  db.saveBooks(books);
  res.status(201).json(newBook);
});

// GET a specific book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const books = db.getBooks();
  const book = books.find(book => book.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

// PUT/update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  const books = db.getBooks();
  const index = books.findIndex(book => book.id === bookId);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  books[index] = { ...books[index], ...updatedBook };
  db.saveBooks(books);
  res.json(books[index]);
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  let books = db.getBooks();
  const updatedBooks = books.filter(book => book.id !== bookId);
  if (books.length === updatedBooks.length) {
    return res.status(404).json({ message: 'Book not found' });
  }
  db.saveBooks(updatedBooks);
  res.json({ message: 'Book deleted successfully' });
});

// Search books
app.get('/search', (req, res) => {
    const { query } = req.query;
    const searchResults = db.searchBooks(query);
    res.json(searchResults);
  });
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
