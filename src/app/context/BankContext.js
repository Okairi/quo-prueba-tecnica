// contexts/MyContext.js

"use client";
import React, { createContext, useState, useContext } from "react";

const MyContext = createContext();

export function MyContextProvider({ children }) {
  const [myState, setMyState] = useState({});

  const updateState = (newValue) => {
    setMyState(newValue);
  };

  return (
    <MyContext.Provider value={{ myState, updateState }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
