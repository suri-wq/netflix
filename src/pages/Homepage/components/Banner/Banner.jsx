import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Alert from 'react-bootstrap/Alert';
import "./Banner.style.css"
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Banner = () => {
    const navigate = useNavigate()
    const {data, isLoading, isError, error}=usePopularMoviesQuery()
    console.log("ddd",data)
    if(isLoading){
       return <h1 className='text-muted'>Loading...</h1>
    }
    if(isError){
       return <Alert variant='danger'>
       {error.message}
     </Alert>
    } 

    const movie = data?.results?.[0]
    const handleClick=()=>{
      if (movie?.id){
        navigate(`/movies/${movie.id}`)
      }
    }
  return (
    <div>
       <div
        style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.results[0].backdrop_path})`,
        }}
        className="banner"
        
        >
            <div className='text-white banner-text-area'>
                <h1>{data?.results[0].title}</h1>
                <p className='banner-text-overview'>{data?.results[0].overview}</p>
                <Button variant='outline-danger' onClick={handleClick}>영화 상세보기</Button>
            </div>
        </div>
    </div>
  )
}

export default Banner