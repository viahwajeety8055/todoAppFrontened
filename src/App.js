// App.js (or wherever your routes are defined)
import React from "react";
import Header from "./components/Header/header";
import Login from "./components/Login/Login";
import Register from "./components/Register/register";
import Container from "./components/Container/container";
import BlogContainer from "./components/BlogContainer/blogContainer";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/">
            <Route path="home" element={<Container />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
