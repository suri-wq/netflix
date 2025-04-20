import React from 'react'
import './MovieSlider.style.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import MovieCard from '../MovieCard/MovieCard'

const MovieSlider = ({ title, movies, responsive }) => {
  console.log('movies prop:', movies)
  return (
    <div>
      <h3 className="text-white">{title}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={5000}
      >
        {/* {movies?.results?.map((movie,index)=><MovieCard movie={movie} key={index}/>)} */}
        {movies?.length > 0 ? (
          movies.map((movie) => <MovieCard movie={movie} />)
        ) : (
          <h3 className="text-white">No movies</h3>
        )}
      </Carousel>
    </div>
  )
}

export default MovieSlider
