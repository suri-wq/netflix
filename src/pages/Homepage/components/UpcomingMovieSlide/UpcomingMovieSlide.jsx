import React from 'react'
import { Alert } from 'react-bootstrap'
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies'
import { responsive } from '../../../../constants/responsive'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider'

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery()

  if (isLoading) {
    return <h1 className="text-black">Loading...</h1>
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>
  }

  return (
    <div className="slide-parent">
      <MovieSlider
        title="Upcoming Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  )
}

export default UpcomingMovieSlide
