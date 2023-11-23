import Prizes, { TPrizes } from '@components/prizes/Prizes'
import { Prize, PrizeId } from '@services/api/response/prize'
import * as prizeModel from '@services/models/prize'

const mountPrizes = (resolvedValue: TPrizes) => {
  cy.stub(prizeModel, 'getPrizes').as('getPrizes').resolves(resolvedValue)

  cy.mountWithMemoryRouter(<Prizes />)

  cy.findByRole('heading', { name: /loading/i })
  cy.get('@getPrizes').should('be.calledOnce')
}

describe('<Prizes />', () => {
  beforeEach(function () {
    cy.fixture('prize').then((prizeFixture: Prize) => {
      const key = 'fakeKey' as PrizeId
      this.prizesModelData = { [key]: prizeFixture } as TPrizes
    })
  })

  it('should display the total number of codes', function () {
    mountPrizes(this.prizesModelData)
    cy.findByTestId('codes-amount').within(($el) => {
      expect($el.text()).to.match(/total number of your codes:\s?\d+/i)
    })
  })

  it('should show the "no promotions available at this time" title', () => {
    mountPrizes({} as TPrizes)
    cy.findByRole('heading', {
      name: /no promotions available at this time/i,
    })
  })

  it('should show the "all promotions" title', function () {
    mountPrizes(this.prizesModelData)
    cy.findByRole('heading', { name: /all promotions/i })
  })

  describe('prize card', function () {
    beforeEach(function () {
      mountPrizes(this.prizesModelData)
    })

    it('should render a card', () => {
      cy.findAllByRole('button', { name: /card title/i })
        .eq(0)
        .within(() => {
          cy.findByRole('img', {
            name: /card title/i,
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
          name: /card title/i,
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
