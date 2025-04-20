import React, { useEffect, useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import api from '../../utils/api'
import { Alert, Container, Spinner, Col, Row, Button } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate'
import './MoviePage.style.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'

const MoviePage = () => {
  const [query, setQuery] = useSearchParams()
  const [filters, setFilters] = useState({
    genre: null,
    rating: null,
    popularity: null,
  })
  const [page, setPage] = useState(1)
  const keyword = query.get('q')

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    ...filters,
  })
  const { data: movieGenreData } = useMovieGenreQuery()
  const handlePageClick = ({ selected }) => {
    console.log('page', page)
    setPage(selected + 1)
  }

  const filteredAndSortedResults = (data?.results || [])
    .filter(
      (movie) => !filters.genre || movie.genre_ids.includes(filters.genre),
    )
    .sort((a, b) => {
      const { rating, popularity } = filters

      if (rating) {
        return rating === 'desc'
          ? b.vote_average - a.vote_average
          : a.vote_average - b.vote_average
      }

      if (popularity) {
        return popularity === 'desc'
          ? b.popularity - a.popularity
          : a.popularity - b.popularity
      }
      return 0
    })

  if (isLoading) {
    return (
      <div>
        <Spinner
          animation="border"
          variant="danger"
          style={{
            width: '5rem',
            height: '5rem',
            position: 'absolute',
            left: '50%',
            top: '50%',
          }}
        />
      </div>
    )
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>
  }
  console.log('fff', filteredAndSortedResults)

  return (
    <Container>
      <Row>
        <Col lg={12} xs={12} style={{ marginBottom: '20px' }}>
          <ButtonGroup>
            <DropdownButton
              variant="danger"
              as={ButtonGroup}
              title="인기도"
              id="bg-nested-dropdown"
            >
              <Dropdown.Item
                eventKey="1"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    popularity: 'desc',
                    rating: null,
                  }))
                }
              >
                인기 많은 순
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    popularity: 'asc',
                    rating: null,
                  }))
                }
              >
                인기 적은 순
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              variant="danger"
              as={ButtonGroup}
              title="장르"
              id="bg-nested-dropdown"
            >
              {movieGenreData?.map((genre) => (
                <Dropdown.Item
                  key={genre.id}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, genre: genre.id }))
                  }
                >
                  {genre.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <DropdownButton
              variant="danger"
              as={ButtonGroup}
              title="평점"
              id="bg-nested-dropdown"
            >
              <Dropdown.Item
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    rating: 'desc',
                    popularity: null,
                  }))
                }
              >
                평점 높은 순
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    rating: 'asc',
                    popularity: null,
                  }))
                }
              >
                평점 낮은 순
              </Dropdown.Item>
            </DropdownButton>
            <Button
              variant="danger"
              onClick={() =>
                setFilters({ genre: null, rating: null, popularity: null })
              }
            >
              필터 초기화
            </Button>
            <Button variant="danger" onClick={() => setQuery('')}>
              검색 초기화
            </Button>
          </ButtonGroup>
        </Col>
        <Col lg={12} xs={12}>
          <Row style={{ marginBottom: '20px' }}>
            {filteredAndSortedResults?.length > 0 ? (
              filteredAndSortedResults.map((movie, index) => (
                <Col
                  style={{ marginBottom: '10px' }}
                  key={index}
                  lg={3}
                  md={3}
                  xs={6}
                >
                  <MovieCard movie={movie} />
                </Col>
              ))
            ) : (
              <p>결과가 없습니다.</p>
            )}
          </Row>
        </Col>
        {filteredAndSortedResults?.length > 0 && (
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
            containerClassName="pagination justify-content-center"
            activeClassName="active"
            forcePage={page - 1}
          />
        )}
      </Row>
    </Container>
  )
}

export default MoviePage
