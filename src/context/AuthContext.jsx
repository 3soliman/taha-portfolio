import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [ok, setOk] = useState(() => sessionStorage.getItem("taha_admin") === "1");

  const login = (pass, correct) => {
    if (pass === correct) { sessionStorage.setItem("taha_admin", "1"); setOk(true); return true; }
    return false;
  };
  const logout = () => { sessionStorage.removeItem("taha_admin"); setOk(false); };

  return <AuthContext.Provider value={{ isAuthenticated: ok, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
