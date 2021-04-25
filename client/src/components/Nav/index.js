import React from "react";

function Nav() {
  return (
    <div>

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        React Reading List
      </a>
    </nav>
    <ul>
        <li><a href="/">Search</a></li>
        <li><a href="/saved">Saved</a></li>
    </ul>
    </div>
  );
}

export default Nav;
