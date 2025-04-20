import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './AppLayout.style.css'
const AppLayout = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const searchByKeyword = (event) => {
    event.preventDefault()
    // url을 바꿔주기
    navigate(`/movies?q=${keyword}`)
    setKeyword('')
  }
  const loginPage = () => {
    navigate('/login')
  }
  return (
    <div>
      <Navbar expand="lg" className="nav-body">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              width={100}
              src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to="/" className="nav-link">
                Home
              </Link>

              <Link to="movies" className="nav-link">
                Movies
              </Link>
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                        Something else here
                    </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" disabled>
                    Link
                    </Nav.Link> */}
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button
                className="btn-border-radius"
                variant="outline-danger"
                type="submit"
              >
                Search
              </Button>
            </Form>
            <Button
              variant="light"
              style={{ marginLeft: '10px' }}
              onClick={loginPage}
              className="btn-border-radius"
            >
              Sign In
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default AppLayout
