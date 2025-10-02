import React, {createContext,useReducer,useEffect,useCallback,useMemo,} from "react";
import { validateForm } from ".././utils/validation";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGOUT" }
  | { type: "AUTH_START" }
  | { type: "AUTH_ERROR"; payload: string };

interface AuthContextValue {
  state: AuthState;
  login: (data: Record<string, string>) => Promise<void>;
  register: (data: Record<string, string>) => Promise<void>;
  logout: () => void;
}

const initialAuthState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, isLoggedIn: true, user: action.payload };
    case "LOGOUT":
      return initialAuthState;
    case "AUTH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const stored = localStorage.getItem("user_credentials");
    if (stored) {
      try {
        const user: User = JSON.parse(stored);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } catch {
        localStorage.removeItem("user_credentials");
      }
    }
  }, []);

  const login = useCallback(async (data: Record<string, string>) => {
    dispatch({ type: "AUTH_START" });
    const errors = validateForm(data, "login");
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "AUTH_ERROR", payload: "Validasi gagal" });
      return Promise.reject(errors);
    }
    await new Promise((r) => setTimeout(r, 500));
    const user: User = {
      id: Date.now().toString(),
      username: data.email.split("@")[0],
      email: data.email,
    };
    localStorage.setItem("user_credentials", JSON.stringify(user));
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  }, []);

  const register = useCallback(async (data: Record<string, string>) => {
    dispatch({ type: "AUTH_START" });
    const errors = validateForm(data, "register");
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "AUTH_ERROR", payload: "Validasi gagal" });
      return Promise.reject(errors);
    }
    await new Promise((r) => setTimeout(r, 500));
    const user: User = {
      id: Date.now().toString(),
      username: data.username,
      email: data.email,
    };
    localStorage.setItem("user_credentials", JSON.stringify(user));
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user_credentials");
    dispatch({ type: "LOGOUT" });
  }, []);

  const value = useMemo(
    () => ({ state, login, register, logout }),
    [state, login, register, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
