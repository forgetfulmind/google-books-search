import React from "react";
import { Col, Row, Container } from "../Grid";


function Nav() {
  return (
    <div className="nav navbar navbar-expand-xxl bg-dark mb-4">
  <a className="navbar-brand" href="/">Google Books</a>

  <ul className="navbar nav" > 
  <li className="nav-item">
    <a className="nav-link active" href="/">Search</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/saved">Saved</a>
  </li>
</ul>

  
    </div>
  );
}

export default Nav;
