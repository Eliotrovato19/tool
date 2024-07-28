import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="Nav">
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/post">post</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="ideas">ideas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
