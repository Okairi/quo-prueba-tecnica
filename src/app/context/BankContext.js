"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

const MyContext = createContext();

export function MyContextProvider({ children }) {
  const initialState = JSON.parse(localStorage.getItem("myState")) || {};

  const [myState, setMyState] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("myState", JSON.stringify(myState));
  }, [myState]);

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
