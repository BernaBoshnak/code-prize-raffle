import {
  createContext,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import { RefreshTokenResponse } from '../../services/api/response/login'
import usePersistedState from '../hooks/usePersistedState'
import { calculateExpiresAt } from '../utils/date'
import useAbortController from '../hooks/useAbortController'
import { useTokenValidationContext } from './TokenValidationContext'

type TokenData = {
  idToken: RefreshTokenResponse['id_token']
  refreshToken: RefreshTokenResponse['refresh_token']
  expiresAt: number
}

type TAuthContext = {
  idToken: TokenData['idToken'] | null
  isLoggedIn: boolean
  storeToken: (props: TokenData) => void
  logout: () => void
}

const TIMEOUT_BEFORE_EXPIRY = 1 * 60 * 1000 // 1 minute in ms

const AuthContext = createContext<TAuthContext | undefined>(undefined)

const calculateRemainingTime = (expiresAt: TokenData['expiresAt']) => {
  const currentTime = new Date().getTime()
  const remainingDuration = expiresAt - currentTime

  return remainingDuration
}

const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const [tokenObject, setTokenObject] =
    usePersistedState<TokenData>('tokenData')

  const { isValidToken, postJson } = useTokenValidationContext()
  const isLoggedIn = Boolean(tokenObject)

  const logout = useCallback(() => {
    setTokenObject(null)
  }, [setTokenObject])

  const storeToken = useCallback(
    (props: TokenData) => {
      setTokenObject({ ...props })
    },
    [setTokenObject],
  )

  const controller = useAbortController()

  const getUserData = useCallback(
    (idToken: TokenData['idToken']) => {
      const api = import.meta.env.VITE_REACT_APP_FIREBASE_API_ENDPOINT
      const key = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY
      const url = `${api}:lookup?key=${key}`

      postJson(url, {
        body: { idToken },
        signal: controller.signal,
      })
    },
    [controller.signal, postJson],
  )

  const getNewToken = useCallback(
    (refreshToken: TokenData['refreshToken']) => {
      const api = import.meta.env.VITE_REACT_APP_FIREBASE_REFRESH_TOKEN_ENDPOINT
      const key = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY
      const url = `${api}=${key}`

      return postJson<RefreshTokenResponse>(url, {
        body: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
      })
    },
    [postJson],
  )

  // Logout the user if the token is invalid
  useEffect(() => {
    if (!isValidToken) {
      logout()
    }
  }, [isValidToken, logout])

  // Fetch user data once on initial app load
  const isInitialUserDataFetched = useRef(false)
  useEffect(() => {
    if (isInitialUserDataFetched.current) {
      return
    }

    if (tokenObject?.idToken) {
      getUserData(tokenObject.idToken)
      isInitialUserDataFetched.current = true
    }
  }, [getUserData, tokenObject?.idToken])

  useEffect(() => {
    if (tokenObject?.expiresAt) {
      const remainingTime = calculateRemainingTime(tokenObject.expiresAt)
      const fireAfter = remainingTime - TIMEOUT_BEFORE_EXPIRY

      const timeout = setTimeout(() => {
        getNewToken(tokenObject.refreshToken).then((response) => {
          const expiresAt = calculateExpiresAt(response.expires_in)

          storeToken({
            idToken: response.id_token,
            refreshToken: response.refresh_token,
            expiresAt,
          })
        })
      }, fireAfter)

      return () => clearTimeout(timeout)
    }
  }, [
    tokenObject?.expiresAt,
    tokenObject?.refreshToken,
    storeToken,
    getNewToken,
  ])

  const contextValue: TAuthContext = useMemo(
    () => ({
      idToken: tokenObject?.idToken ?? null,
      isLoggedIn,
      storeToken,
      logout,
    }),
    [isLoggedIn, tokenObject?.idToken, logout, storeToken],
  )

  return <AuthContext.Provider value={contextValue} {...props} />
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuthContext cannot be used oustide of AuthContextProvider',
    )
  }

  return context
}

export default AuthContextProvider
