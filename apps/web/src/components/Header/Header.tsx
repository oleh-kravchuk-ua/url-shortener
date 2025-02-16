import type React from "react";

import logo from "./logo.svg";

import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>
        <span>URL Shortener</span>
        &nbsp;
        <img src={logo} className="logo" alt="logo" />
      </h1>
    </header>
  );
};

export default Header;
