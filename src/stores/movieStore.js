import { create } from 'zustand'

const movieStore = create(() => ({
  favMovies: [],
}))

export default movieStore
