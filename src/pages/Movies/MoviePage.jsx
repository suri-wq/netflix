import React, { useState } from 'react'
import { useSearchMoviQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import api from '../../utils/api'
import { Alert, Container, Spinner, Col, Row } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate'


const MoviePage = () => {
  const [query, setQuery] = useSearchParams()
  const [page, setPage] = useState(1)
  const keyword = query.get('q');

  const {data, isLoading, isError, error} = useSearchMoviQuery({keyword,page})
  const handlePageClick=({selected})=>{
    console.log("page",page)
    setPage(selected+1)
  }
  
  console.log("ddd",data)
  if (isLoading){
    return(
      <div>
        <Spinner
          animation='border'
          variant='danger'
          style={{ width: "5rem", height:"5rem"}}
        />
      </div>
    )
  }

  if (isError){
    return <Alert variant='danger'>{error.message}</Alert>
  }
  
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>필터</Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie,index)=><Col key={index} lg={4} xs={12}>
            <MovieCard movie={movie}/>
          </Col>)}
          </Row>
        </Col>
          <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={data?.total_pages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={page-1}
          />
      </Row>

    </Container>
  )
}

export default MoviePage