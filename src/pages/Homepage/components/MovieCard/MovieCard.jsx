import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import api from '../../../../utils/api'

const MovieCard = ({movie}) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
          try {
            const response = await api.get('/genre/movie/list?language=en&api_key=...');
            setGenres(response.data.genres);
          } catch (err) {
            console.error('Fetch error:', err);
          }
        };
      
        fetchGenres();
      }, []); // 👈 this empty array is crucial

    const getGenreName = (id)=>{
        const genre = genres.find((g)=>g.id===id);
        return genre?genre.name:'Unknown';
    }
  return (
    <div className='movie-card' style={{backgroundImage:"url("+`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`+")"}}>
        <div className='overlay'>
            <h2>{movie.title}</h2>
            {movie.genre_ids.map((id)=>(
                <Badge bg="danger">{getGenreName(id)}</Badge>
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