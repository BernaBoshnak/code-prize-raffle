import { Route, Routes } from 'react-router-dom'
import GuardNotAuthenticated from '@components/route-guards/GuardNotAuthenticated'
import AuthContextProvider, {
  TIMEOUT_BEFORE_EXPIRY,
} from '@components/store/AuthContext'
import TokenValidationContextProvider from '@components/store/TokenValidationContext'
import { RefreshTokenResponse } from '@services/api/response/login'
import { LocationData } from './utils/LocationData'

describe('Token Validation', () => {
  it('should refresh the token correctly', () => {
    const currentTime = new Date().getTime()
    const tenMinutes = 10 * 60 * 1000
    const expiresAt = currentTime + tenMinutes
    const newIdToken = 'new-valid-token'
    const refreshToken = 'refresh-token'

    cy.localStorageSetItem(
      'tokenData',
      JSON.stringify({
        idToken: 'valid-token',
        refreshToken,
        expiresAt,
      }),
    )

    const url = '*?key=*'
    const method = 'POST'
    cy.intercept(method, url, {
      statusCode: 200,
      body: {
        expires_in: '3600',
        refresh_token: refreshToken,
        id_token: newIdToken,
      } as RefreshTokenResponse,
    }).as('refreshRequest')

    cy.clock(currentTime)

    cy.mountWithMemoryRouter(
      <TokenValidationContextProvider>
        <AuthContextProvider />
      </TokenValidationContextProvider>,
    )

    cy.tick(expiresAt - TIMEOUT_BEFORE_EXPIRY)
    cy.wait('@refreshRequest')

    // Wait for the local storage to be updated
    cy.wait(100)

    cy.localStorageGetItem('tokenData').then(($tokenData) => {
      const tokenData = cy.wrap($tokenData)
      tokenData.should('deep.include', {
        idToken: newIdToken,
        refreshToken,
      })

      tokenData.its('expiresAt').should('not.eq', expiresAt)
    })
  })

  it('should show modal and redirect to login after token change', () => {
    cy.localStorageSetItem(
      'tokenData',
      JSON.stringify({
        idToken: 'invalid-token',
      }),
    )

    const url = '*:lookup?key=*'
    const method = 'POST'

    cy.intercept(method, url, {
      statusCode: 400,
      body: {
        error: {
          message: 'INVALID_ID_TOKEN',
        },
      },
    })

    const redirectTimeout = 100

    cy.mountWithMemoryRouter(
      <TokenValidationContextProvider redirectTimeout={redirectTimeout}>
        <AuthContextProvider>
          <Routes>
            <Route element={<GuardNotAuthenticated to="/redirected" />}>
              <Route path="*" element={<LocationData pathname />} />
            </Route>
            <Route path="/redirected" element={<LocationData pathname />} />
          </Routes>
        </AuthContextProvider>
      </TokenValidationContextProvider>,
    )

    cy.findByTestId('invalid-token-modal')
    cy.findByTestId('location-pathname').should(($el) =>
      expect($el.text()).to.eq('/'),
    )

    cy.wait(redirectTimeout)

    cy.findByTestId('location-pathname').should(($el) =>
      expect($el.text()).to.eq('/redirected'),
    )
  })
})
