import { create } from 'zustand'

interface AuthState {
  isAuth: boolean
  setAuth: (s: boolean) => void
  password: string | null
  login?: (password: string) => void;
  logout?: () => void;
}

export const useAuth = create<AuthState>()((set) => ({
  isAuth: false,
  password: null,
  setAuth: (isAuth) => set(() => ({ isAuth })),
  login: (password: string) => {
    set({ isAuth: true, password });
  },
  logout: () => set({ isAuth: false, password: null }),
}))
