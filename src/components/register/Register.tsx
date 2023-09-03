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
import { object, string, ref, InferType } from 'yup'

const Register = () => {
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
      confirmPassword: string()
        .required('Please re-type your password.')
        .oneOf([ref('password')], 'Passwords does not match.'),
    }),
  )

  type SchemaType = InferType<typeof schema>

  const formFields: { [K in keyof SchemaType]: K } = {
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
  }

  const createInitialState = (): Record<keyof SchemaType, string[]> => ({
    email: [],
    password: [],
    confirmPassword: [],
  })

  const [formInputValidity, setFormInputValidity] = useState(
    createInitialState(),
  )

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()

    const {
      email: emailInput,
      password: passwordInput,
      confirmPassword: confirmPasswordInput,
    } = e.currentTarget as EventTarget &
      Element &
      Record<keyof typeof formFields, HTMLInputElement>

    schema
      .validate(
        {
          email: emailInput.value,
          password: passwordInput.value,
          confirmPassword: confirmPasswordInput.value,
        },
        { abortEarly: false },
      )
      .then(() => {
        setFormInputValidity(createInitialState())
      })
      .catch(
        (err: { inner: { path: keyof SchemaType; message: string }[] }) => {
          const formValidation = err.inner.reduce((acc, current) => {
            acc[current.path].push(current.message)
            return acc
          }, createInitialState())

          setFormInputValidity(formValidation)
        },
      )
  }

  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100 w-100">
        <Col md={6} lg={4} className="shadow p-5 bg-body-tertiary rounded-4">
          <h2 className="mb-5 text-center text-primary text-opacity-75">
            Register Form
          </h2>
          <Form onSubmit={submitHandler}>
            <FloatingLabel
              controlId={useId()}
              label="Email address"
              className="mb-3 text-body-tertiary fw-medium"
            >
              <Form.Control
                type="email"
                name={formFields.email}
                placeholder="Email address"
                isInvalid={formInputValidity.email.length > 0}
              />
              <Form.Control.Feedback type="invalid">
                {formInputValidity.email}
              </Form.Control.Feedback>
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
                isInvalid={formInputValidity.password.length > 0}
              />
              {formInputValidity.password.map((error, index) => (
                <Form.Control.Feedback key={index} type="invalid">
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
                isInvalid={formInputValidity.confirmPassword.length > 0}
              />
              <Form.Control.Feedback type="invalid">
                {formInputValidity.confirmPassword}
              </Form.Control.Feedback>
            </FloatingLabel>

            <Button
              type="submit"
              variant="primary"
              className="btn-lg w-100 text-white fw-medium fs-4"
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
