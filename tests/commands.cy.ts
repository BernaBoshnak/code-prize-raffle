describe('commands', () => {
  describe('local storage', () => {
    it('should set an item', () => {
      cy.localStorageSetItem('token', 'fake-token')
    })

    it('should get an item', () => {
      cy.localStorageSetItem('token', 'fake-token')
      cy.localStorageGetItem('token').should('equal', 'fake-token')
    })
  })
})
