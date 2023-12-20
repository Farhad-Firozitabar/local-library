import DeleteBook from './DeleteBook';
import EditBook from './EditBook';
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import Navbar from './Nav';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [sortByTitle, setSortByTitle] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [sortByTitle]);

  const fetchBooks = async () => {
    try {
      let response;
      if (sortByTitle) {
        response = await axios.get(`http://localhost:3001/books?sortBy=title`);
      } else {
        response = await axios.get(`http://localhost:3001/books`);
      }
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className='container' >
      <Navbar />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>
            <Button variant="link" onClick={() => setSortByTitle(!sortByTitle)}>
                Title {sortByTitle ? '▲' : '▼'}
              </Button>
            </th>
            <th>Author</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {books.map((book) => (
    <tr key={book.id}>
      <td>{book.id}</td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.genre}</td>
      <td>

        <span style={{ marginRight: '5px' }}>
          <DeleteBook bookId={book.id} fetchBooks={fetchBooks} />
        </span>

        <EditBook bookId={book.id} fetchBooks={fetchBooks} />
      </td>
    </tr>
  ))}
</tbody>

      </Table>
    </div>
  );
};

export default BookList;
