import { useId, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { routes } from '../../data/routes'
import { object, string, InferType } from 'yup'
import useFormValidation from '../hooks/useFormValidation'

const Login = () => {
  const getCharacterValidationError = (
    str: 'digit' | 'lowercase' | 'uppercase',
  ) => `Your password must have at least 1 ${str} character.`

  const [schema] = useState(() =>
    object().shape({
      email: string()
        .email('Must be a valid email.')
        .required('Email is required.'),
      password: string()
        .required('Password is required.')
        .min(6, 'Password must have at least 6 characters.')
        .matches(/[0-9]/, getCharacterValidationError('digit'))
        .matches(/[a-z]/, getCharacterValidationError('lowercase'))
        .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
    }),
  )

  type SchemaType = InferType<typeof schema>

  const formFields: { [K in keyof SchemaType]: K } = {
    email: 'email',
    password: 'password',
  }

  const createInitialState = (): Record<
    keyof SchemaType,
    { isTouched: boolean; errorMessages: string[] }
  > => ({
    email: {
      isTouched: false,
      errorMessages: [],
    },
    password: {
      isTouched: false,
      errorMessages: [],
    },
  })

  const [formInputValidity, setFormInputValidity] = useState(
    createInitialState(),
  )

  const { handleChangeAndBlur } = useFormValidation(
    schema,
    setFormInputValidity,
    createInitialState,
  )

  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100 w-100">
        <Col md={6} lg={4} className="shadow p-5 bg-body-tertiary rounded-4">
          <h2 className="mb-5 text-center text-primary text-opacity-75">
            Login Form
          </h2>
          <Form noValidate data-testid="login-form">
            <FloatingLabel
              controlId={useId()}
              label="Email address"
              className="mb-3 text-body-tertiary fw-medium"
            >
              <Form.Control
                type="email"
                name={formFields.email}
                placeholder="Email address"
                onBlur={handleChangeAndBlur}
                onChange={handleChangeAndBlur}
                isInvalid={
                  formInputValidity.email.isTouched &&
                  formInputValidity.email.errorMessages.length > 0
                }
                aria-invalid={
                  formInputValidity.email.isTouched &&
                  formInputValidity.email.errorMessages.length > 0
                }
              />
              {formInputValidity.email.errorMessages.map((error) => (
                <Form.Control.Feedback key={error} type="invalid">
                  {error}
                </Form.Control.Feedback>
              ))}
            </FloatingLabel>

            <FloatingLabel
              controlId={useId()}
              label="Password"
              className="mb-3 text-body-tertiary fw-medium"
            >
              <Form.Control
                type="password"
                name={formFields.password}
                placeholder="Password"
                onBlur={handleChangeAndBlur}
                onChange={handleChangeAndBlur}
                isInvalid={
                  formInputValidity.password.isTouched &&
                  formInputValidity.password.errorMessages.length > 0
                }
                aria-invalid={
                  formInputValidity.password.isTouched &&
                  formInputValidity.password.errorMessages.length > 0
                }
              />
              {formInputValidity.password.errorMessages.map((error) => (
                <Form.Control.Feedback key={error} type="invalid">
                  {error}
                </Form.Control.Feedback>
              ))}
            </FloatingLabel>

            <Button
              type="submit"
              variant="primary"
              className="btn-lg w-100 text-white fw-medium fs-4"
            >
              Log In
            </Button>
          </Form>
          <div className="mt-3 text-center">
            Not registered?&nbsp;
            <Link
              to={routes.register}
              className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              Register
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
