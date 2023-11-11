import { Route, Routes } from 'react-router-dom'
import Menu from '@components/Menu'
import AuthContextProvider from '@components/store/AuthContext'
import TokenValidationContextProvider from '@components/store/TokenValidationContext'
import { LocationData } from './utils/LocationData'

describe('user logout', () => {
  beforeEach(() => {
    cy.mountWithMemoryRouter(
      <TokenValidationContextProvider>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="*" element={<LocationData pathname />} />
          </Routes>
        </AuthContextProvider>
      </TokenValidationContextProvider>,
    )
  })

  it('should log out user by removing the token from local storage', () => {
    cy.localStorageSetItem('token', 'fake-token')
    cy.findByRole('button', { name: /exit/i }).as('logout btn').click()
    cy.localStorageGetItem('token')
    cy.findByTestId('location-pathname').should(($el) =>
      expect($el.text()).to.eq('/login'),
    )
  })
})
