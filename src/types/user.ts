// src/types/user.ts

export interface User {
  id: number;          // id user
  username: string;    // nama user
  email: string;       // email user
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" };

export interface AuthContextValue {
  state: AuthState;
  login: (formData: { email: string; password: string; username?: string }) => Promise<void>;
  register: (formData: { email: string; password: string; username: string }) => Promise<void>;
  logout: () => void;
}
