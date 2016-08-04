import React from 'react';
import { Link } from 'react-router';

// function based "dumb" component with no state
const NavBar = () => {
  return (
    <nav>
      <Link to="/">Blog</Link>
      <Link className="addPost" to="posts/new">Add</Link>
    </nav>
  );
};


export default NavBar;
