import { createContext, useState } from "react";

export const ShiftContext = createContext();

const ShiftProvider = ({ children }) => {
  const [data, setData] = useState(0);
  return (
    <ShiftContext.Provider value={{ data }}>{children}</ShiftContext.Provider>
  );
};

export default ShiftProvider;
