import React, { useReducer, useMemo, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthState, AuthAction, AuthContextValue, User } from "../../types/user";

// --- INITIAL STATE ---
const initialAuthState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// --- REDUCER ---
const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, isLoggedIn: true, user: action.payload };
    case "LOGIN_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...initialAuthState };
    default:
      return state;
  }
};

// --- PROVIDER ---
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = useCallback(async (formData: { email: string; password: string; username?: string }) => {
    dispatch({ type: "LOGIN_START" });
    try {
      setTimeout(() => {
        const user: User = {
          id: Date.now(),
          username: formData.username || "Guest",
          email: formData.email,
        };
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      }, 500);
    } catch {
      dispatch({ type: "LOGIN_ERROR", payload: "Login gagal" });
    }
  }, []);

  const register = useCallback(async (formData: { email: string; password: string; username: string }) => {
    await login(formData);
  }, [login]);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  const value: AuthContextValue = useMemo(
    () => ({ state, login, register, logout }),
    [state, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
