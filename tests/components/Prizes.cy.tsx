import Prizes, { TPrizes } from '@components/prizes/Prizes'
import AuthContextProvider from '@components/store/AuthContext'
import TokenValidationContextProvider from '@components/store/TokenValidationContext'
import { Prize, PrizeId } from '@services/api/response/prize'
import * as prizeModel from '@services/models/prize'

const mountPrizesWithUsersCount = (resolvedValue: TPrizes) => {
  cy.stub(prizeModel, 'getPrizesWithUsersCount')
    .as('getPrizesWithUsersCount')
    .resolves(resolvedValue)

  cy.mountWithMemoryRouter(
    <TokenValidationContextProvider>
      <AuthContextProvider>
        <Prizes />
      </AuthContextProvider>
    </TokenValidationContextProvider>,
  )

  cy.findByRole('heading', { name: /loading/i })
  cy.get('@getPrizesWithUsersCount').should('be.calledOnce')
}

describe('<Prizes />', () => {
  beforeEach(function () {
    cy.fixture('prize').then((prizeFixture: Prize) => {
      const key = 'fakeKey' as PrizeId
      this.prizesModelData = {
        [key]: {
          ...prizeFixture,
          assigned_users_count: 5,
          amount: 50,
        },
      } as TPrizes
    })
  })

  it('should display the total number of codes', function () {
    mountPrizesWithUsersCount(this.prizesModelData)
    cy.findByTestId('codes-amount').within(($el) => {
      expect($el.text()).to.match(/total number of your codes:\s?\d+/i)
    })
  })

  it('should show the "no promotions available at this time" title', () => {
    mountPrizesWithUsersCount({} as TPrizes)
    cy.findByRole('heading', {
      name: /no promotions available at this time/i,
    })
  })

  it('should show the "all promotions" title', function () {
    mountPrizesWithUsersCount(this.prizesModelData)
    cy.findByRole('heading', { name: /all promotions/i })
  })

  describe('prize card', function () {
    beforeEach(function () {
      mountPrizesWithUsersCount(this.prizesModelData)
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

    it.only('should display the modal', () => {
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
