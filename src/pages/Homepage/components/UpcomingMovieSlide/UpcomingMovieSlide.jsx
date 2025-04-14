import React from 'react'
import { Alert } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import './UpcomingMovieSlide.style.css'
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };
const UpcomingMovieSlide = () => {
    const {data, isLoading, isError, error}= useUpcomingMoviesQuery()
    
    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    }


    return (
    <div className='slide-parent'>
        <h3 className='text-white'>Upcoming Movies</h3>
        <Carousel
            infinite={true}
            centerMode={true}
            itemClass='movie-slider p-1'
            containerClass='carousel-container'
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={5000}
        >
            {data.results.map((movie,index)=><MovieCard movie={movie} key={index}/>)}

        </Carousel>;
    </div>
  )
}

export default UpcomingMovieSlide
