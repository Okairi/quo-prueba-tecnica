"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

const MyContext = createContext();

export function MyContextProvider({ children }) {
  // Cargar el estado inicial desde localStorage, si existe
  const initialState = JSON.parse(localStorage.getItem("myState")) || {};

  const [myState, setMyState] = useState(initialState);

  // Actualizar localStorage cada vez que myState cambie
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
