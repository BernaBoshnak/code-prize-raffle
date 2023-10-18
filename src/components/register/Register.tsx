import { useId, useState, useEffect, useRef } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Alert,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../../data/routes'
import { object, string, ref, InferType } from 'yup'
import useFormValidation from '../hooks/useFormValidation'
import { formatErrorMessage } from '../utils/formMessage'
import { postJson } from '../../services/api/fetch'

const Register = () => {
  const getCharacterValidationError = (
    str: 'digit' | 'lowercase' | 'uppercase',
  ) => `Your password must have at least 1 ${str} character.`
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
      confirmPassword: string()
        .required('Please re-type your password.')
        .oneOf([ref('password')], 'Passwords do not match.'),
    }),
  )

  type SchemaType = InferType<typeof schema>

  const formFields: { [K in keyof SchemaType]: K } = {
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
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
    confirmPassword: {
      isTouched: false,
      errorMessages: [],
    },
  })

  const [formInputValidity, setFormInputValidity] = useState(
    createInitialState(),
  )

  const { handleChangeAndBlur, handleValidate } = useFormValidation(
    schema,
    setFormInputValidity,
    createInitialState,
  )

  const navigate = useNavigate()

  const controllerRef = useRef(new AbortController())
  useEffect(() => {
    const controller = controllerRef.current

    return () => {
      controller.abort()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const isValid = handleValidate(e, ['email', 'password', 'confirmPassword'])

    if (!isValid) {
      return
    }

    const api = import.meta.env.VITE_REACT_APP_FIREBASE_API_ENDPOINT
    const key = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY
    const url = `${api}:signUp?key=${key}`
    const form = e.currentTarget

    try {
      setIsLoading(true)
      await postJson(url, {
        body: {
          email: form.email.value,
          password: form.password.value,
          returnSecureToken: true,
        },
        signal: controllerRef.current.signal,
      })

      navigate(routes.login)
    } catch (e) {
      const error = e as { message: string }
      const message =
        e instanceof TypeError // Fetch error (e.g. no internet connection)
          ? 'Something went wrong!'
          : formatErrorMessage(error.message)

      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100 w-100">
        <Col md={6} lg={4} className="shadow p-5 bg-body-tertiary rounded-4">
          <h2 className="mb-4 text-center text-primary text-opacity-75">
            Register Form
          </h2>
          {error && (
            <Alert variant="danger">
              <strong>{error}</strong>
            </Alert>
          )}
          <Form noValidate onSubmit={handleSubmit} data-testid="register-form">
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
                onBlur={(e) => {
                  handleChangeAndBlur(e, [formFields.confirmPassword])
                }}
                onChange={(e) => {
                  handleChangeAndBlur(e, [formFields.confirmPassword])
                }}
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

            <FloatingLabel
              controlId={useId()}
              label="Confirm password"
              className="mb-3 text-body-tertiary fw-medium"
            >
              <Form.Control
                type="password"
                name={formFields.confirmPassword}
                placeholder="Confirm password"
                onBlur={(e) => {
                  handleChangeAndBlur(e, [formFields.password])
                }}
                onChange={(e) => {
                  handleChangeAndBlur(e, [formFields.password])
                }}
                isInvalid={
                  formInputValidity.confirmPassword.isTouched &&
                  formInputValidity.confirmPassword.errorMessages.length > 0
                }
                aria-invalid={
                  formInputValidity.confirmPassword.isTouched &&
                  formInputValidity.confirmPassword.errorMessages.length > 0
                }
              />
              {formInputValidity.confirmPassword.errorMessages.map((error) => (
                <Form.Control.Feedback key={error} type="invalid">
                  {error}
                </Form.Control.Feedback>
              ))}
            </FloatingLabel>

            <Button
              type="submit"
              variant="primary"
              className="btn-lg w-100 text-white fw-medium fs-4"
              disabled={isLoading}
            >
              Create Account
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <Link
              to={routes.login}
              className="text-center px-2 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              Login with existing account
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
