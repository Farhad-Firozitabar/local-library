const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'books.json');

function getBooks() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading the file', err);
    return [];
  }
}
function getBooks(sortBy = '') {
    let books = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (sortBy === 'title') {
      books = books.sort((a, b) => a.title.localeCompare(b.title));
    }
  
    return books;
  }
function saveBooks(books) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
  } catch (err) {
    console.error('Error writing to the file', err);
  }
}

function findBookById(id) {
  const books = getBooks();
  return books.find(book => book.id === id);
}

function addBook(newBook) {
  const books = getBooks();
  newBook.id = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  books.push(newBook);
  saveBooks(books);
  return newBook;
}

function updateBook(id, updatedBook) {
  const books = getBooks();
  const index = books.findIndex(book => book.id === id);
  if (index === -1) {
    return null;
  }
  books[index] = { ...books[index], ...updatedBook };
  saveBooks(books);
  return books[index];
}

function deleteBook(id) {
  let books = getBooks();
  const updatedBooks = books.filter(book => book.id !== id);
  if (books.length === updatedBooks.length) {
    return null;
  }
  saveBooks(updatedBooks);
  return { message: 'Book deleted successfully' };
}

function searchBooks(query) {
  const books = getBooks();
  const filteredBooks = books.filter(
    book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.genre.toLowerCase().includes(query.toLowerCase())
  );
  return filteredBooks;
}

module.exports = {
  getBooks,
  saveBooks,
  findBookById,
  addBook,
  updateBook,
  deleteBook,
  searchBooks,
};
