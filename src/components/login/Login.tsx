import { useId, useState } from 'react'
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { InferType, object, string } from 'yup'
import useAbortController from '@components/hooks/useAbortController'
import useFormValidation from '@components/hooks/useFormValidation'
import { useAuthContext } from '@components/store/AuthContext'
import { calculateExpiresAt } from '@components/utils/date'
import { formatErrorMessage } from '@components/utils/formMessage'
import { postJson } from '@services/api/fetch'
import { LoginResponse } from '@services/api/response/login'
import { routes } from '../../data/routes'

const Login = () => {
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

  const { handleChangeAndBlur, handleValidate } = useFormValidation(
    schema,
    setFormInputValidity,
    createInitialState,
  )

  const { storeToken } = useAuthContext()

  const navigate = useNavigate()
  const controller = useAbortController()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const isValid = handleValidate(e, ['email', 'password'])

    if (!isValid) {
      return
    }

    const api = import.meta.env.VITE_REACT_APP_FIREBASE_API_ENDPOINT
    const key = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY
    const url = `${api}:signInWithPassword?key=${key}`
    const form = e.currentTarget

    try {
      setIsLoading(true)
      const res = await postJson<LoginResponse>(url, {
        body: {
          email: form.email.value,
          password: form.password.value,
          returnSecureToken: true,
        },
        signal: controller.signal,
      })

      if (res) {
        const expiresAt = calculateExpiresAt(res.expiresIn)

        storeToken({
          idToken: res.idToken,
          refreshToken: res.refreshToken,
          expiresAt,
        })
      }

      // Login successful, redirect
      navigate(routes.prizes)
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
            Login Form
          </h2>
          {error && (
            <Alert variant="danger">
              <strong>{error}</strong>
            </Alert>
          )}
          <Form noValidate onSubmit={handleSubmit} data-testid="login-form">
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
              disabled={isLoading}
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
