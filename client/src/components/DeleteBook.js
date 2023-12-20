import React from 'react';
import axios from 'axios';

const DeleteBook = ({ bookId, fetchBooks }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/books/${bookId}`);
      // After successful deletion, update the book list
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeleteBook;
