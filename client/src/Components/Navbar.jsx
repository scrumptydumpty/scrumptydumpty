import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div>
    <Link to="/">scrumpty</Link>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
  </div>
);
export default Navbar;