import { useId } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { routes } from '../data/routes'

const Login = () => {
  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={6} lg={4}>
          <h2 className="mb-5 text-center text-primary text-opacity-75">
            Login Form
          </h2>
          <Form>
            <Form.Group className="mb-3" controlId={useId()}>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" size="lg" />
            </Form.Group>

            <Form.Group className="mb-3" controlId={useId()}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                size="lg"
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="btn-lg w-100 text-white fw-medium fs-4"
            >
              Log In
            </Button>

            <div className="mt-4 text-center">
              Not registered?
              <Link
                to={routes.register}
                className="px-2 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Register
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
