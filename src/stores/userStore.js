import { create } from 'zustand'

const userStore = create((set) => ({
  user: '',
  increase: () => set((state) => ({ count: state.count + 1 })),
}))

export default userStore
