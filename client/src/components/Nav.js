import React from 'react';
import Search from './Search';
import AddBook from './AddBook';

const Navbar = () => {
  return (
    <nav className="navbar bg-body-tertiary mb-5">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand">Local Library📚</a>
        <div className="d-flex gap-2">
          <AddBook />
          <Search />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
