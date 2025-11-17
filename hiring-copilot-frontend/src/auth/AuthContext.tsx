import { createContext, useContext, useState } from "react";

type User = {
  username: string;
  role: "user" | "hr" | "admin";
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Datos quemados
  const usersDB = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "hr", password: "hr123", role: "hr" },
    { username: "user", password: "user123", role: "user" },
  ];

  async function login(username: string, password: string) {
    const found = usersDB.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) return false;

    setUser({
      username: found.username,
      role: found.role as User["role"],
    });

    return true;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
