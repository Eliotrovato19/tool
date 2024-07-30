import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="Nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">New Bidmax</Link>
        </li>
      
        <li>
          <Link to="ideas">Query</Link>
        </li>
        <li>
          <Link to="claude">Bidmax Ideas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
