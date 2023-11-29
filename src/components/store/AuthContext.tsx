import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import useAbortController from '@components/hooks/useAbortController'
import usePersistedState from '@components/hooks/usePersistedState'
import { calculateExpiresAt } from '@components/utils/date'
import {
  LoginResponse,
  RefreshTokenResponse,
} from '@services/api/response/login'
import { useTokenValidationContext } from './TokenValidationContext'

export type TokenData = {
  idToken: LoginResponse['idToken']
  localId?: LoginResponse['localId']
  refreshToken: LoginResponse['refreshToken']
  expiresAt: number
}

type TAuthContext = {
  idToken: TokenData['idToken'] | null
  localId: TokenData['localId']
  isLoggedIn: boolean
  setTokenObject: (value: TokenData | null) => void
  logout: () => void
}

export const TIMEOUT_BEFORE_EXPIRY = 1 * 60 * 1000 // 1 minute in ms

const AuthContext = createContext<TAuthContext | undefined>(undefined)

const calculateRemainingTime = (expiresAt: TokenData['expiresAt']) => {
  const currentTime = new Date().getTime()
  const remainingDuration = expiresAt - currentTime

  return remainingDuration
}

const AuthContextProvider = (props: { children?: React.ReactNode }) => {
  const [tokenObject, setTokenObject] =
    usePersistedState<TokenData>('tokenData')

  const { shouldRedirectToLogin, postJson } = useTokenValidationContext()
  const isLoggedIn = Boolean(tokenObject)

  const logout = useCallback(() => {
    setTokenObject(null)
  }, [setTokenObject])

  const controller = useAbortController()

  const getUserData = useCallback(
    async (idToken: TokenData['idToken']) => {
      const api = import.meta.env.VITE_REACT_APP_FIREBASE_API_ENDPOINT
      const key = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY
      const url = `${api}:lookup?key=${key}`

      await postJson(url, {
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
      const url = `${api}?key=${key}`

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
    if (shouldRedirectToLogin) {
      logout()
    }
  }, [shouldRedirectToLogin, logout])

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

  // Refresh token
  useEffect(() => {
    if (tokenObject?.expiresAt) {
      const remainingTime = calculateRemainingTime(tokenObject.expiresAt)
      const fireAfter = remainingTime - TIMEOUT_BEFORE_EXPIRY

      const timeout = setTimeout(() => {
        getNewToken(tokenObject.refreshToken).then((response) => {
          const expiresAt = calculateExpiresAt(response.expires_in)

          setTokenObject({
            ...tokenObject,
            idToken: response.id_token,
            refreshToken: response.refresh_token,
            expiresAt,
          })
        })
      }, fireAfter)

      return () => clearTimeout(timeout)
    }
  }, [tokenObject, getNewToken, setTokenObject])

  const contextValue: TAuthContext = useMemo(
    () => ({
      idToken: tokenObject?.idToken ?? null,
      localId: tokenObject?.localId,
      isLoggedIn,
      logout,
      setTokenObject,
    }),
    [
      isLoggedIn,
      tokenObject?.idToken,
      tokenObject?.localId,
      logout,
      setTokenObject,
    ],
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
