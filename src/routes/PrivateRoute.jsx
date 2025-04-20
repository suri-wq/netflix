import React from 'react'
import FavoriteMovies from '../pages/FavoriteMovies/FavoriteMovies'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ authenticate }) => {
  return authenticate == true ? <FavoriteMovies /> : <Navigate to="login" />
}

export default PrivateRoute
