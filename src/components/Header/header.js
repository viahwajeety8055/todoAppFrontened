// Header.js
import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">Blog Website</div>
      <div className="icons">
        <Link to="/login" className="icon-link">
          <FaSignInAlt className="icon" />
        </Link>
        <Link to="/register" className="icon-link">
          <FaUser className="icon" />
        </Link>
      </div>
    </div>
  );
}
