import React from 'react'
import './Login.style.css'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const Login = () => {
  return (
    <Container className="login-container">
      <div className="login-wrap">
        <h1>Sign In</h1>

        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="User name"
            className="mb-3 mt-4"
          >
            <Form.Control
              type="name"
              placeholder="Jane doe"
              className="form-color-ctrl"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              className="form-color-ctrl"
            />
          </FloatingLabel>
          <Button
            variant="outline-danger"
            className="mt-5"
            type="submit"
            style={{ width: '100%' }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default Login
