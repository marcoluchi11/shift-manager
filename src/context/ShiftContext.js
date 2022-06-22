import { createContext, useState } from "react";

export const ShiftContext = createContext();

const ShiftProvider = ({ children }) => {
  const [register, setRegister] = useState({ email: "", password: "" });
  const [user, setUser] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  return (
    <ShiftContext.Provider
      value={{ register, setRegister, login, setLogin, user, setUser }}
    >
      {children}
    </ShiftContext.Provider>
  );
};

export default ShiftProvider;
