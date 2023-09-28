import React from "react";
import ReactDOM from "react-dom/client";
import Container from "./components/Container/container";
import App from "./App";
import { TokenProvider } from "./TokenContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TokenProvider>
    <App />
  </TokenProvider>
);
