import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddBook = ({ fetchBooks }) => {
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
  });

  const handleInputChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/books', newBook);
      setShowModal(false);
      fetchBooks(); // Trigger fetchBooks after successfully adding a book
      setNewBook({ title: '', author: '', genre: '' }); // Reset form fields
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button variant="dark" onClick={() => setShowModal(true)}>
        Add Book
      </Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>Author:</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="genre">
              <Form.Label>Genre:</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={newBook.genre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button className='mt-3' variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddBook;
