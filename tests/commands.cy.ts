describe('commands', () => {
  describe('local storage', () => {
    it('should set an item', () => {
      cy.localStorageSetItem('key', 'value')
    })

    it('should get an item', () => {
      cy.localStorageSetItem('key', 'value')
      cy.localStorageGetItem('key').should('equal', 'value')
    })
  })
})
