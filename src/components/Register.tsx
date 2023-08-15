import { useId } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { routes } from '../data/routes'

const Register = () => {
  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100 w-100">
        <Col md={6} lg={4} className="shadow p-5 bg-body-tertiary rounded-4">
          <h2 className="mb-5 text-center text-primary text-opacity-75">
            Register Form
          </h2>
          <Form>
            <Form.Floating className="mb-3">
              <Form.Control
                id={useId()}
                type="email"
                placeholder="Email address"
              />
              <label htmlFor={useId()} className="text-body-tertiary fw-medium">
                Email address
              </label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id={useId()}
                type="password"
                placeholder="Password"
              />
              <label htmlFor={useId()} className="text-body-tertiary fw-medium">
                Password
              </label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id={useId()}
                type="confirm-password"
                placeholder="Confirm password"
              />
              <label htmlFor={useId()} className="text-body-tertiary fw-medium">
                Confirm password
              </label>
            </Form.Floating>

            <Button
              type="submit"
              variant="primary"
              className="btn-lg w-100 text-white fw-medium fs-4"
            >
              Create Account
            </Button>

            <div className="mt-4 text-center">
              <Link
                to={routes.login}
                className="mt-4 text-center px-2 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Login with existing account
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
