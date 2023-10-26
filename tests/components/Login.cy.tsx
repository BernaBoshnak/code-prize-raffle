import Login from '../../src/components/login/Login'
import AuthContextProvider from '../../src/components/store/AuthContext'

describe('<Login />', () => {
  beforeEach(() => {
    cy.mountWithMemoryRouter(
      <AuthContextProvider>
        <Login />
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
})
