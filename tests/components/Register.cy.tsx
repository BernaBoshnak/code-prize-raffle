import Register from '../../src/components/register/Register'

describe('<Register />', () => {
  beforeEach(() => {
    cy.mountWithMemoryRouter(<Register />)
    cy.findByTestId('register-form').as('registerForm')
  })

  describe('form validation', () => {
    describe('email', () => {
      beforeEach(() => {
        cy.get('@registerForm').within(() => {
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
        cy.get('@input').type('fake')
        cy.get('@input').should('have.attr', 'aria-invalid', 'true')
        cy.findByText(/must be a valid email/i)
        cy.get('@input').type('@example.com')
        cy.get('@input').should('have.attr', 'aria-invalid', 'false')
      })
    })

    describe('password', () => {
      beforeEach(() => {
        cy.get('@registerForm').within(() => {
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

        const password = ['_', 'A', 'a', '1', '23']
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

    describe('confirm password', () => {
      beforeEach(() => {
        cy.get('@registerForm').within(() => {
          cy.findByLabelText(/confirm password/i).as('input')
        })
        cy.get('@input').should('have.attr', 'aria-invalid', 'false')
      })

      it('should have the "password" type', () => {
        cy.get('@input').should('have.attr', 'type', 'password')
      })

      it('should validate confirm password input via blur', () => {
        cy.get('@input').focus()
        cy.get('@input').blur()
        cy.get('@input').should('have.attr', 'aria-invalid', 'true')
        cy.findByText(/please re-type your password/i)
      })

      it('should validate confirm password input via change', () => {
        const password = '12345Aa'
        cy.findByLabelText('Password').type(password)
        cy.get('@input').type(password + 'b')
        cy.get('@input').should('have.attr', 'aria-invalid', 'true')
        cy.findByText(/passwords do not match/i)
        cy.get('@input').type('{backspace}')
        cy.findByText(/passwords do not match/i).should('not.exist')
        cy.get('@input').should('have.attr', 'aria-invalid', 'false')
      })
    })
  })

  it('should show page heading', () => {
    cy.findByRole('heading', { name: /register form/i })
  })

  it('should show login link', () => {
    cy.findByRole('link', { name: /login with existing account/i }).should(
      'have.attr',
      'href',
      '/login',
    )
  })

  it('should show "create account" submit button', () => {
    cy.get('@registerForm').within(() => {
      cy.findByRole('button', { name: /create account/i })
    })
  })

  it.skip('should successfully register a new user', () => {})
})
