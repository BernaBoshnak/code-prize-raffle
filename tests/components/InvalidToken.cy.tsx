import InvalidTokenModal from '@components/modals/InvalidTokenModal'

describe('Invalid token', () => {
  describe('<InvalidTokenModal />', () => {
    it('renders the modal with the correct content', () => {
      cy.mount(<InvalidTokenModal show />)
      cy.findByRole('heading', {
        name: /invalid session/i,
      })
      cy.findByText(/you will be redirected to the login page/i)
    })
  })
})
