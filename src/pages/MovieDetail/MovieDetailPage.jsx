import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail'
import { Alert, Spinner, Container, Col, Row, Button, Badge } from 'react-bootstrap'
import './MovieDetailPage.style.css'
import { useMovieReviewQuery } from '../../hooks/useMovieReview'

import Accordion from 'react-bootstrap/Accordion';
import { useMovieRecommendationsQuery } from '../../hooks/useMovieRecommendations'
import MovieSlider from '../../common/MovieSlider/MovieSlider'
import { responsive } from '../../constants/responsive'
import { useMovieVideosQuery } from '../../hooks/useMovieVideos'
import YouTube from 'react-youtube'
import Modal from 'react-bootstrap/Modal';
import { useMovieCreditsQuery } from '../../hooks/useMovieCredits'



const MovieDetailPage = () => {
  const {id} = useParams()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data: movie, isLoading, isError, error} = useMovieDetailQuery(id)
  const { data: review, isLoading: reviewLoading, isError: reviewError, error: reviewErrMsg} = useMovieReviewQuery(id)
  const { data: movie_recommendations, isLoading: recLoading, isError: recError, error: recErrMsg} = useMovieRecommendationsQuery(id)
  const {
    data: video,
    isLoading: vidLoading,
    isError: vidError,
    error: vidErrMsg
  } = useMovieVideosQuery(id)
  const {data:credits, isLoading:creditLoading, isError:creditError, error:creditErrMsg} = useMovieCreditsQuery(id)
  if (
    isLoading || reviewLoading || recLoading || vidLoading || creditLoading
  ) {
    console.log("로딩 중 video 상태:", video) // 여기에!
    return (
      <div>
          <Spinner
            animation='border'
            variant='danger'
            style={{ width: "5rem", height:"5rem", position:"absolute",left:"50%", top:"50%"}}
          />
        </div>
      )
  }
  if (isError || reviewError || recError || vidError || creditError) {
    return (
      <Alert variant="danger">
        {error?.message || reviewErrMsg?.message || recErrMsg?.message || vidErrMsg?.message || creditErrMsg?.message || '알 수 없는 에러'}
      </Alert>
    )
  }
  const trailer = video?.results?.find(
    v => v.site === 'YouTube' && v.type === 'Trailer'
  )  
  
  console.log("crediuts", credits)

  return (
    <Container>
      <Row>
        <Col
            lg={12}
            xs={12}
            className="text-center backdrop-img"
          >
            <img
              src={`https://www.themoviedb.org/t/p/w780${movie.backdrop_path}`}
              alt={movie.title}
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
            />
        </Col>
      </Row>
      <Row className="align-items-center mt-5 mb-5">
        <Col
          lg={6}
          xs={12}
          className="mb-4 mb-lg-0"
        >
          <div className='poster-img'>
              <img
                src={`https://www.themoviedb.org/t/p/w780${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid rounded shadow"
              />
          </div>
        </Col>
        
        
        <Col
          lg={6}
          xs={12}
          className="mb-4 mb-lg-0"
        >
          <div>
            
            <div className='pb-2'>
            {movie?.genres?.map((genre) => (
              <Badge className='me-2 p-2' key={genre.id}  pill bg="warning" text="dark">{genre.name}</Badge>
            ))}            
            </div>
            <h1>{movie.title}</h1>
            <h4>{movie.tagline}</h4>

            <div className="mb-2 text-white">
              <span><strong>평균</strong> {movie.vote_average}</span> ·
              <span> {movie.release_date?.slice(0, 4)}</span> ·
              <span> {movie.runtime}분</span> ·
              <span> {movie.genres[0]?.name}</span> ·
              <span> {movie.production_companies[0]?.origin_country}</span>  ·
              <span> {movie.revenue.toLocaleString('en-US')} USD</span>
            </div>
            <div className="text-white">
              <strong>출연 </strong>
              {credits.slice(0, 10).map((person, index) => (
                <span key={person.id || index}>
                  {person.name}
                  {index < 9 && ', '}
                </span>
              ))}
            </div>
            <hr className='text-white'/>
            <p>{movie.overview}</p>
            <hr className='text-white'/>
            <div className="d-flex gap-2 mt-3">
              <Button variant="outline-danger">보고싶어요</Button>
              <Button variant="outline-danger">평가하기</Button>
              <Button variant="warning" onClick={handleShow}>
                예고편 재생
              </Button>
              <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                  <Modal.Title>{trailer?.name || '예고편'}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 0 }}>
                  {trailer ? (
                    <YouTube
                      videoId={trailer.key}
                      opts={{
                        width: '100%',
                        height: '400',
                        playerVars: {
                          autoplay: 1,
                          rel: 0,
                          modestbranding: 1
                        }
                      }}
                    />
                  ) : (
                    <p className="text-muted p-3">예고편이 없습니다.</p>
                  )}
                </Modal.Body>
              </Modal>

            </div>
          </div>
        </Col>
        
      </Row>
      <Row>

      <Col className="mb-5">
        <h1>Reviews</h1>
        {review?.results?.length > 0 ? (
          <Accordion alwaysOpen>
            {review.results.slice(0,5).map((rvww, index) => (
              <Accordion.Item key={rvww.id || index} eventKey={String(index)}>
                <Accordion.Header><strong>name : </strong> {rvww.author}</Accordion.Header>
                <Accordion.Body>
                  {rvww?.content || 'no reviews'}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <h3 className="text-white">리뷰가 없습니다.</h3>
        )}
      </Col>
     
      </Row>
      <Row>
        <h1>관련 영화</h1>
        <Col>
          <MovieSlider title='' movies={movie_recommendations.results} responsive={responsive}/>

        </Col>
      </Row>
      
    </Container>

  )
}

export default MovieDetailPage