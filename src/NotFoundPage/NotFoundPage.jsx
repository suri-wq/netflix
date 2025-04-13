import React from 'react'
import { Container } from 'react-bootstrap'
import "./NotFoundPage.style.css"
import { Link } from 'react-router-dom'
const NotFoundPage = () => {
  return (
    <Container className='not-found-container'>
        <div>
            <h1>😭</h1>
            <h2>This is not the page you are looking for</h2>
            <h3>Wanna go home? 👉
                <Link to='/'>
                     🏡
                </Link>
            </h3>
            
        </div>
        

    </Container>
  )
}

export default NotFoundPage