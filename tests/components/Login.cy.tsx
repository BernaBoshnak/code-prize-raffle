import { Route, Routes } from 'react-router-dom'
import Login from '../../src/components/login/Login'
import AuthContextProvider from '../../src/components/store/AuthContext'
import { LocationData } from './utils/LocationData'

describe('<Login />', () => {
  beforeEach(() => {
    cy.mountWithMemoryRouter(
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<LocationData pathname />} />
        </Routes>
      </AuthContextProvider>,
    )
    cy.findByTestId('login-form').as('loginForm')
  })

  describe('form validation', () => {
    describe('email', () => {
      beforeEach(() => {
        cy.get('@loginForm').within(() => {
          cy.findByLabelText(/email address/i).as('input')
        })
        cy.get('@input').should('have.attr', 'aria-invalid', 'false')
      })

      it('should have the "email" type', () => {
        cy.get('@input').should('have.attr', 'type', 'email')
      })

      it('should validate email input via blur', () => {
        cy.get('@input').focus()
        cy.get('@input').blur()
        cy.get('@input').should('have.attr', 'aria-invalid', 'true')
        cy.findByText(/email is required/i)
      })

      it('should validate email input via change', () => {
        cy.get('@input').type('test')
        cy.get('@input').should('have.attr', 'aria-invalid', 'true')
        cy.findByText(/must be a valid email/i)
        cy.get('@input').type('@example.com')
        cy.get('@input').should('have.attr', 'aria-invalid', 'false')
      })
    })

    describe('password', () => {
      beforeEach(() => {
        cy.get('@loginForm').within(() => {
          cy.findByLabelText('Password').as('input')
        })
        cy.get('@input').should('have.attr', 'aria-invalid', 'false')
      })

      it('should have the "password" type', () => {
        cy.get('@input').should('have.attr', 'type', 'password')
      })

      it('should validate password input via blur', () => {
        const errorMessages = [
          'Password is required.',
          'Password must have at least 6 characters.',
          'Your password must have at least 1 digit character.',
          'Your password must have at least 1 lowercase character.',
          'Your password must have at least 1 uppercase character.',
        ]

        cy.get('@input').focus()
        cy.get('@input').blur()
        cy.get('@input').should('have.attr', 'aria-invalid', 'true')
        errorMessages.forEach((errorMessage) => {
          cy.findByText(errorMessage)
        })
      })

      it('should validate password input via change', () => {
        const errorMessages = [
          'Your password must have at least 1 uppercase character.',
          'Your password must have at least 1 lowercase character.',
          'Your password must have at least 1 digit character.',
          'Password must have at least 6 characters.',
        ]

        const password = ['@', 'B', 'b', '2', '34']
        cy.get('@input').type(password[0])
        cy.get('@input').should('have.attr', 'aria-invalid', 'true')
        errorMessages.forEach((errorMessage) => {
          cy.findByText(errorMessage)
        })
        for (let i = 0; i < errorMessages.length; i++) {
          cy.get('@input').type(password[i + 1])
          cy.findByText(errorMessages[i]).should('not.exist')
        }
        cy.get('@input').should('have.attr', 'aria-invalid', 'false')
      })
    })
  })

  it('should show page heading', () => {
    cy.findByRole('heading', { name: /login form/i })
  })

  it('should show register link', () => {
    cy.findByRole('link', { name: /register/i }).should(
      'have.attr',
      'href',
      '/register',
    )
  })

  it('should show "log in" submit button', () => {
    cy.get('@loginForm').within(() => {
      cy.findByRole('button', { name: /log in/i })
    })
  })

  describe('user login', () => {
    const url = '*signInWithPassword?key=*'
    const method = 'POST'

    beforeEach(() => {
      cy.findByLabelText(/email address/i).type('email@example.com')
      cy.findByLabelText('Password').type('Password123')
      cy.findByRole('button', { name: /log in/i }).as('submit')
    })

    it('should make the submit button disabled', () => {
      cy.intercept(method, url, {
        statusCode: 400,
        body: null,
        delay: 100,
      }).as('loginRequest')

      cy.get('@submit').should('not.be.disabled')
      cy.get('@submit').click()
      cy.get('@submit').should('be.disabled')
      cy.wait('@loginRequest')
      cy.get('@submit').should('not.be.disabled')
    })

    it('should successfully log in the user', () => {
      cy.intercept(method, url, {
        fixture: 'login-success.json',
        statusCode: 200,
      }).as('loginRequest')

      cy.get('@submit').click()
      cy.wait('@loginRequest')
      cy.findByTestId('location-pathname').should(($el) =>
        expect($el.text()).to.eq('/prizes'),
      )
    })

    it('should render the error message when the user email is wrong', () => {
      cy.intercept(method, url, {
        fixture: 'login-wrong-email.json',
        statusCode: 400,
      }).as('loginRequest')

      cy.get('@submit').click()
      cy.wait('@loginRequest')
      cy.findByRole('alert').then(($el) => {
        expect($el.text()).to.eq('Email not found')
      })
    })

    it('should render the error message when the user password is wrong', () => {
      cy.intercept(method, url, {
        fixture: 'login-wrong-password.json',
        statusCode: 400,
      }).as('loginRequest')

      cy.get('@submit').click()
      cy.wait('@loginRequest')
      cy.findByRole('alert').then(($el) => {
        expect($el.text()).to.eq('Invalid password')
      })
    })

    it('should render the generic error message something is wrong', () => {
      cy.intercept(method, url, {
        body: null,
        statusCode: 400,
      }).as('loginRequest')

      cy.get('@submit').click()
      cy.wait('@loginRequest')
      cy.findByRole('alert').then(($el) => {
        expect($el.text()).to.contain('Something went wrong')
      })
    })
  })
})
