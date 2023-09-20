import Navigation from '../../src/components/Navigation'

describe('<Navigation />', () => {
  beforeEach(() => {
    cy.mountWithMemoryRouter(<Navigation />)
  })

  it('should render "Prizes" tab link', () => {
    cy.findByRole('link', { name: /prizes/i }).should(
      'have.attr',
      'href',
      '/prizes',
    )
  })

  it('should render "Code" tab', () => {
    cy.findByRole('button', { name: /code/i })
  })

  it('should render "More" tab link', () => {
    cy.findByRole('link', { name: /more/i }).should(
      'have.attr',
      'href',
      '/menu',
    )
  })

  it('should bring the modal for entering codes', () => {
    cy.findByRole('dialog').should('not.exist')
    cy.findByRole('button', { name: /code/i }).click()
    cy.findByRole('dialog')
      .should('exist')
      .within(() => {
        cy.findByTestId('total-amount-of-codes').should(($el) => {
          expect($el.text()).to.match(/total amount of your codes:\s?\d+/i)
        })
        cy.findByLabelText(/enter PIN code/i).should(
          'have.attr',
          'placeholder',
          'XXXXXXXXXXXXXXXX',
        )
        cy.findByRole('button', { name: /submit/i })
        cy.findByRole('button', {
          name: /close/i,
        }).click()
      })
    cy.findByRole('dialog').should('not.exist')
  })
})
