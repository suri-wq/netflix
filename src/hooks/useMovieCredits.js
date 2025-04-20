import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchMovieCredits = (movieId) => {
  return api.get(`/movie/${movieId}/credits`)
}

export const useMovieCreditsQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-credits', movieId],
    queryFn: () => fetchMovieCredits(movieId),
    select: (result) => result.data.cast,
    enabled: !!movieId,
  })
}
