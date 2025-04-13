import React from 'react'
import { Container } from 'react-bootstrap'
import "./NotFoundPage.style.css"
const NotFoundPage = () => {
  return (
    <Container className='not-found-container'>
        <div>
            <h1>😭</h1>
            <h2>This is not the page you are looking for</h2>
            <h3>Wanna go home? 👉</h3>
        </div>
        

    </Container>
  )
}

export default NotFoundPage