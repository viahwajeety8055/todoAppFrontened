// src/TokenContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context for the token
const TokenContext = createContext();

// Create a provider component that will wrap your entire app
export function TokenProvider({ children }) {
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

// Create a custom hook to access the token
export function useToken() {
  return useContext(TokenContext);
}
