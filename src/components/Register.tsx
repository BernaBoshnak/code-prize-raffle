import { useId } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap'
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
            <FloatingLabel
              controlId={useId()}
              label="Email address"
              className="mb-3 text-body-tertiary fw-medium"
            >
              <Form.Control type="email" placeholder="email" />
            </FloatingLabel>

            <FloatingLabel
              controlId={useId()}
              label="Password"
              className="mb-3 text-body-tertiary fw-medium"
            >
              <Form.Control type="password" placeholder="password" />
            </FloatingLabel>

            <FloatingLabel
              controlId={useId()}
              label="Confirm password"
              className="mb-3 text-body-tertiary fw-medium"
            >
              <Form.Control
                type="confirm-password"
                placeholder="confirm-password"
              />
            </FloatingLabel>

            <Button
              type="submit"
              variant="primary"
              className="btn-lg w-100 text-white fw-medium fs-4"
            >
              Create Account
            </Button>

            <div className="mt-3 text-center">
              <Link
                to={routes.login}
                className="text-center px-2 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
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
