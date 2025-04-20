import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import api from '../../utils/api'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  const { data: genreData } = useMovieGenreQuery()
  const showGenre = (genreIdList) => {
    if (!genreData) return []
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id)
      return genreObj.name
    })

    return genreNameList
  }
  const handleClick = () => {
    navigate(`/movies/${movie.id}`)
  }

  return (
    <div
      className="movie-card"
      style={{
        width: '220px',
        height: '330px',
        backgroundImage: `url(${
          movie.poster_path
            ? `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`
            : '/img/no_img.png'
        }`,
      }}
      onClick={handleClick}
    >
      <div className="overlay">
        <h2>{movie.title}</h2>
        {showGenre(movie.genre_ids).map((genre) => (
          <Badge bg="danger">{genre}</Badge>
        ))}
        <div>
          <div>Average: {movie.vote_average}</div>
          <div>Popularity: {movie.popularity}</div>
          <div>
            Rating:{' '}
            {movie.adult === true || movie.adult === 'true' ? (
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
