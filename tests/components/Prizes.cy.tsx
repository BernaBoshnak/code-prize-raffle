import Prizes from '@components/prizes/Prizes'

describe('<Prizes />', () => {
  beforeEach(() => {
    cy.mountWithMemoryRouter(<Prizes />)
  })

  it('should display the total number of codes', () => {
    cy.findByTestId('codes-amount').within(($el) => {
      expect($el.text()).to.match(/total number of your codes:\s?\d+/i)
    })
  })

  it('should show page heading', () => {
    cy.findByRole('heading', { name: /all promotions/i })
  })

  describe('prize card', () => {
    it('should render a card', () => {
      cy.findAllByRole('button', { name: /card title/i })
        .eq(0)
        .within(() => {
          cy.findByRole('img', {
            name: /card image/i,
          })
          cy.findByTestId('card-body').within(() => {
            cy.findByText(/card title/i)
            cy.findByTestId('prizes-in-stock').should(($el) => {
              expect($el.text()).to.match(/in stock:\s?\d+\s?out of\s?\d+/i)
            })
            cy.findByTestId('required-number-of-codes').should(($el) => {
              expect($el.text()).to.match(/required number of codes:\s?\d+/i)
            })
          })
        })
    })

    it('should display the modal', () => {
      cy.findByRole('dialog').should('not.exist')
      cy.findAllByRole('button', { name: /card title/i })
        .eq(0)
        .click()
      cy.findByRole('dialog').within(() => {
        cy.findByRole('img', {
          name: /card image/i,
        })
        cy.findByRole('heading', {
          name: /card title/i,
        })
        cy.findByTestId('remaining-and-total-entries').should(($el) => {
          expect($el.text()).to.match(
            /number of remaining entries and number of total entries:\s?\d+\s?out of\s?\d+/i,
          )
        })
        cy.findByText(
          /lorem ipsum dolor sit amet, consectetur adipiscing elit/i,
        )
        cy.findByRole('button', {
          name: /enter the raffle/i,
        })
        cy.findByRole('button', {
          name: /close/i,
        }).click()
      })
      cy.findByRole('dialog').should('not.exist')
    })

    it.skip('submits the form', () => {})
  })
})
