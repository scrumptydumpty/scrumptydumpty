import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  if (user === null) {
    return (
      <div>
        <Link to="/">
          scrumpty
        </Link>
        <Link to="/register">
          Register
        </Link>
        <Link to="/login">
          Login
        </Link>
      </div>
    );
  }

  return ((
    <div>
      <Link to="/">
        scrumpty
      </Link>
      <a href="/logout">
        Logout
      </a>
    </div>
  ));
};
export default Navbar;
