import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import SearchResults from './SearchResults';

const Search = () => {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="btn btn-outline-success" onClick={handleSearch}>
        Search
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center">
            <Col>
              <input
                type="text"
                placeholder="Enter Title, Author or Genre"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="form-control"
              />
            </Col>
            <Col xs="auto">
              <Button variant="success" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
          <hr />
          {showModal && <SearchResults query={query} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Search;
