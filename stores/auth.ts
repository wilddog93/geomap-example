import { create } from "zustand";
import { setCookie, deleteCookie } from "cookies-next";

interface AuthState {
  isAuth: boolean;
  token: string | null;
  refreshToken: string | null;
  refreshAccessToken: () => void;
  login: (data: any) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()((set) => ({
  isAuth: false,
  token: null,
  refreshToken: null,
  login: (data) => {
    set({ token: data?.token, refreshToken: data?.refreshToken, isAuth: true });
    setCookie("token", data?.token, {
      secure: false,
      maxAge: 60 * 60 * 24,
    });
    setCookie("refreshToken", data?.refreshToken, {
      secure: false,
      maxAge: 60 * 60 * 24,
    });
  },
  logout: () => {
    set({ isAuth: false, token: null, refreshToken: null });
    deleteCookie("token");
    deleteCookie("refreshToken");
  },
  refreshAccessToken: () => {
    console.log("refresh-token")
  }
}));
