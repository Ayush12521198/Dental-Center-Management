import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const mockUsers = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    const found = mockUsers.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem("authUser", JSON.stringify(found));
      return { success: true, role: found.role };
    }
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);







