import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import api from '../../utils/api'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'

const MovieCard = ({movie}) => {
  const {data: genreData} = useMovieGenreQuery();
  const showGenre=(genreIdList)=>{
    if(!genreData) return []
    const genreNameList=genreIdList.map((id)=>{
      const genreObj = genreData.find((genre)=>genre.id===id)
      return genreObj.name;
    })

    return genreNameList
  }
  
  return (
    <div className='movie-card' style={{backgroundImage:"url("+`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`+")"}}>
        <div className='overlay'>
            <h2>{movie.title}</h2>
            {showGenre(movie.genre_ids).map((genre)=>(
                <Badge bg="danger">{genre}</Badge>
            ))}
            <div>
                <div>Average: {movie.vote_average}</div>
                <div>Popularity: {movie.popularity}</div>
                <div>
                    Rating:{" "}
                    {movie.adult === true || movie.adult === "true" ? (
                        <Badge bg="danger">18+</Badge>
                    ) : (
                        <Badge bg="warning">All Ages</Badge>
                    )}
                    </div>
                </div>
        </div>
        

    </div>
  )
}

export default MovieCard