import { create } from 'zustand'

interface AuthState {
  isAuth: boolean
  setAuth: (s: boolean) => void
  login?: () => void
}

export const useAuth = create<AuthState>()((set) => ({
  isAuth: false,
  setAuth: (isAuth) => set(() => ({ isAuth })),
}))
