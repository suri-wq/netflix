import { create } from 'zustand'

const userStore = create((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}))

export default userStore
