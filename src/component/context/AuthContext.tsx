import { createContext, useContext } from "react";
import type { AuthContextValue } from "../../types/user";

// Context hanya buat definisi, tanpa reducer/provider
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Custom hook biar gampang dipakai
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
