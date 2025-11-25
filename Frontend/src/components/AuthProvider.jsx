import { createContext, useState } from "react";
import { loginAdmin } from "../api/authApi";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("token") ? true : false);

  const login = async (email, password) => {
    const res = await loginAdmin({ email, password });
    localStorage.setItem("token", res.data.token);
    setUser(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
