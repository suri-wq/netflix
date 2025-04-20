import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchMovieDetail = (movieId) => {
  return api.get(`/movie/${movieId}`)
}

export const useMovieDetailQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-detail', movieId],
    queryFn: () => fetchMovieDetail(movieId),
    select: (result) => result.data,
    enabled: !!movieId,
  })
}
