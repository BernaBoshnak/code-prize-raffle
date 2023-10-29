import { Routes, Route } from 'react-router-dom'
import { LocationData } from './utils/LocationData'
import GuardAuthenticated from '../../src/components/route-guards/GuardAuthenticated'
import AuthContextProvider from '../../src/components/store/AuthContext'
import GuardNotAuthenticated from '../../src/components/route-guards/GuardNotAuthenticated'

describe('guards', () => {
  describe('<GuardAuthenticated />', () => {
    it('should navigate to fallback path when authenticated', () => {
      cy.localStorageSetItem('token', 'fake-token')
      cy.mountWithMemoryRouter(
        <AuthContextProvider>
          <Routes>
            <Route element={<GuardAuthenticated to="/test" />}>
              <Route path="*" element={<LocationData pathname />} />
            </Route>
            <Route path="/test" element={<LocationData pathname />} />
          </Routes>
        </AuthContextProvider>,
      )
      cy.findByTestId('location-pathname').should(($el) =>
        expect($el.text()).to.eq('/test'),
      )
    })

    it("should navigate to guard's child route when not authenticated", () => {
      cy.mountWithMemoryRouter(
        <AuthContextProvider>
          <Routes>
            <Route element={<GuardAuthenticated to="/test" />}>
              <Route path="*" element={<LocationData pathname />} />
            </Route>
          </Routes>
        </AuthContextProvider>,
      )
      cy.findByTestId('location-pathname').should(($el) =>
        expect($el.text()).to.eq('/'),
      )
    })
  })

  describe('<GuardNotAuthenticated />', () => {
    it("should navigate to guard's child route when authenticated", () => {
      cy.localStorageSetItem('token', 'fake-token')
      cy.mountWithMemoryRouter(
        <AuthContextProvider>
          <Routes>
            <Route element={<GuardNotAuthenticated to="/test" />}>
              <Route path="*" element={<LocationData pathname />} />
            </Route>
          </Routes>
        </AuthContextProvider>,
      )
      cy.findByTestId('location-pathname').should(($el) =>
        expect($el.text()).to.eq('/'),
      )
    })

    it('should navigate to fallback path when not authenticated', () => {
      cy.mountWithMemoryRouter(
        <AuthContextProvider>
          <Routes>
            <Route element={<GuardNotAuthenticated to="/test" />}>
              <Route path="*" element={<LocationData pathname />} />
            </Route>
            <Route path="/test" element={<LocationData pathname />} />
          </Routes>
        </AuthContextProvider>,
      )
      cy.findByTestId('location-pathname').should(($el) =>
        expect($el.text()).to.eq('/test'),
      )
    })
  })
})
