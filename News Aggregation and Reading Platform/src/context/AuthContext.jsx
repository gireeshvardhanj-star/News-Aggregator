import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function safeParseJSON(str, fallback = null) {
  try {
    return str ? JSON.parse(str) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return safeParseJSON(saved, null);
  });

  const signup = (name, email, password) => {
    const users = safeParseJSON(localStorage.getItem("users"), []);
    const exists = users.find((u) => u.email === email);
    if (exists) return { success: false, error: "Email already registered!" };

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const sessionUser = { name, email };
    localStorage.setItem("user", JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true, error: null };
  };

  const signin = (email, password) => {
    const users = safeParseJSON(localStorage.getItem("users"), []);
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      return { success: false, error: "Invalid email or password!" };
    }

    const sessionUser = { name: found.name, email: found.email };
    localStorage.setItem("user", JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true, error: null };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
