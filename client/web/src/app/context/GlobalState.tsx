"use client";
import React, { useState } from "react";
import { GlobalContextValue, GlobalStateProps } from "./context";
import { GlobalContext } from "./GlobalContext";

export const GlobalState: React.FC<GlobalStateProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>("");
  const updateCurrentPage = (value: string) => {
    setCurrentPage(value);
  };
  const globalStateValue = {
    currentPage: currentPage,
    updateCurrentPage,
  };
  return (
    <GlobalContext.Provider value={globalStateValue}>
      {children}
    </GlobalContext.Provider>
  );
};
