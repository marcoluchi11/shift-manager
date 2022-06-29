import { createContext, useState } from "react";

export const ShiftContext = createContext();

const ShiftProvider = ({ children }) => {
  const [register, setRegister] = useState({ email: "", password: "" });
  const [user, setUser] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState({ state: false, message: "" });
  const [success, setSuccess] = useState(false);
  const [clases, setClases] = useState({ email: "", pack: "" });
  const [loading, setLoading] = useState(false);
  return (
    <ShiftContext.Provider
      value={{
        error,
        success,
        clases,
        loading,
        setLoading,
        setClases,
        setSuccess,
        setError,
        register,
        setRegister,
        login,
        setLogin,
        user,
        setUser,
      }}
    >
      {children}
    </ShiftContext.Provider>
  );
};

export default ShiftProvider;
