import { Routes, Route } from 'react-router-dom'
import { LocationData } from './utils/LocationData'
import GuardAuthenticated from '../../src/components/route-guards/GuardAuthenticated'
import GuardNotAuthenticated from '../../src/components/route-guards/GuardNotAuthenticated'
import TokenValidationContextProvider from '../../src/components/store/TokenValidationContext'
import AuthContextProvider from '../../src/components/store/AuthContext'

describe('guards', () => {
  describe('<GuardAuthenticated />', () => {
    it('should navigate to fallback path when authenticated', () => {
      cy.localStorageSetItem('tokenData', JSON.stringify({}))
      cy.mountWithMemoryRouter(
        <TokenValidationContextProvider>
          <AuthContextProvider>
            <Routes>
              <Route element={<GuardAuthenticated to="/test" />}>
                <Route path="*" element={<LocationData pathname />} />
              </Route>
              <Route path="/test" element={<LocationData pathname />} />
            </Routes>
          </AuthContextProvider>
        </TokenValidationContextProvider>,
      )
      cy.findByTestId('location-pathname').should(($el) =>
        expect($el.text()).to.eq('/test'),
      )
    })

    it("should navigate to guard's child route when not authenticated", () => {
      cy.mountWithMemoryRouter(
        <TokenValidationContextProvider>
          <AuthContextProvider>
            <Routes>
              <Route element={<GuardAuthenticated to="/test" />}>
                <Route path="*" element={<LocationData pathname />} />
              </Route>
            </Routes>
          </AuthContextProvider>
        </TokenValidationContextProvider>,
      )
      cy.findByTestId('location-pathname').should(($el) =>
        expect($el.text()).to.eq('/'),
      )
    })
  })

  describe('<GuardNotAuthenticated />', () => {
    it("should navigate to guard's child route when authenticated", () => {
      cy.localStorageSetItem('tokenData', JSON.stringify({}))
      cy.mountWithMemoryRouter(
        <TokenValidationContextProvider>
          <AuthContextProvider>
            <Routes>
              <Route element={<GuardNotAuthenticated to="/test" />}>
                <Route path="*" element={<LocationData pathname />} />
              </Route>
            </Routes>
          </AuthContextProvider>
        </TokenValidationContextProvider>,
      )
      cy.findByTestId('location-pathname').should(($el) =>
        expect($el.text()).to.eq('/'),
      )
    })

    it('should navigate to fallback path when not authenticated', () => {
      cy.mountWithMemoryRouter(
        <TokenValidationContextProvider>
          <AuthContextProvider>
            <Routes>
              <Route element={<GuardNotAuthenticated to="/test" />}>
                <Route path="*" element={<LocationData pathname />} />
              </Route>
              <Route path="/test" element={<LocationData pathname />} />
            </Routes>
          </AuthContextProvider>
        </TokenValidationContextProvider>,
      )
      cy.findByTestId('location-pathname').should(($el) =>
        expect($el.text()).to.eq('/test'),
      )
    })
  })
})
