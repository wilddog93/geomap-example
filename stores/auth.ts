import { create } from 'zustand'
import { setCookie, deleteCookie } from "cookies-next";

interface AuthState {
  isAuth: boolean
  setAuth: (s: boolean) => void
  token: string | null
  login: (token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()((set) => ({
  isAuth: false,
  token: null,
  setAuth: (isAuth) => set(() => ({ isAuth })),
  login: (token) => {
    set({ token, isAuth: true })
    setCookie("token", token, {
      secure: false,
      maxAge: 60 * 60 * 24,
    });
  },
  logout: () => {
    set({ isAuth: false, token: null })
    deleteCookie("token");
  },
}))
