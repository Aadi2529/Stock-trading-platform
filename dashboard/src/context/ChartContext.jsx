import { createContext, useState } from "react";

export const ChartContext = createContext();

export const ChartProvider = ({ children }) => {

  const [selectedSymbol, setSelectedSymbol] = useState("RELIANCE");

  return (
    <ChartContext.Provider
      value={{ selectedSymbol, setSelectedSymbol }}
    >
      {children}
    </ChartContext.Provider>
  );
};