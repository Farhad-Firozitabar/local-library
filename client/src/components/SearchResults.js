import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';



const SearchResults = ({ query }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/search?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SearchResults;
