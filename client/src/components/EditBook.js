import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const EditBook = ({ bookId, fetchBooks }) => {
  const [showModal, setShowModal] = useState(false);
  const [book, setBook] = useState(null);
  const [editedBook, setEditedBook] = useState({
    title: '',
    author: '',
    genre: '',
  });

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/books/${bookId}`);
      setBook(response.data);
      setEditedBook(response.data);
    } catch (error) {
      console.error('Error fetching book for edit:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedBook({
      ...editedBook,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/books/${bookId}`, editedBook);
      // After successful edit, close the modal and update the book list
      setShowModal(false);
      fetchBooks(); // Trigger a re-fetch of the book list
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  if (!book) {
    return <div>Loading...</div>; // Display a loader while fetching book details
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        Edit
      </Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={editedBook.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                name="author"
                value={editedBook.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Genre:</label>
              <input
                type="text"
                className="form-control"
                name="genre"
                value={editedBook.genre}
                onChange={handleInputChange}
              />
            </div>
            <Button className='mt-3' variant="primary" type="submit">
              Update
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditBook;
