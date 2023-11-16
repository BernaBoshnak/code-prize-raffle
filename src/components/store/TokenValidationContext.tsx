import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import InvalidTokenModal from '@components/modals/InvalidTokenModal'
import * as fetchUtils from '@services/api/fetch'

type TTokenValidationContext = {
  shouldRedirectToLogin: boolean
  postJson: <T>(...args: Parameters<typeof fetchUtils.postJson>) => Promise<T>
}

const TokenValidationContext = createContext<
  TTokenValidationContext | undefined
>(undefined)

type TokenValidationContextProviderProps = {
  children: React.ReactNode
  redirectTimeout?: number
}

const TokenValidationContextProvider = ({
  children,
  redirectTimeout = 3000,
}: TokenValidationContextProviderProps) => {
  const [isValidToken, setIsValidToken] = useState(true)
  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false)

  const postJson = useCallback(
    <T,>(...args: Parameters<typeof fetchUtils.postJson>) => {
      return fetchUtils.postJson<T>(...args).catch((err) => {
        if (err.message === 'INVALID_ID_TOKEN') {
          setIsValidToken(false)
        } else {
          throw err
        }
      }) as ReturnType<typeof fetchUtils.postJson<T>>
    },
    [],
  )

  useEffect(() => {
    if (!isValidToken) {
      const timeout = setTimeout(() => {
        setShouldRedirectToLogin(true)
        setIsValidToken(true)
      }, redirectTimeout)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [isValidToken, redirectTimeout])

  const contextValue = useMemo(
    () => ({
      shouldRedirectToLogin,
      postJson,
    }),
    [shouldRedirectToLogin, postJson],
  )

  return (
    <TokenValidationContext.Provider value={contextValue}>
      <>
        {children}
        <InvalidTokenModal show={!isValidToken} />
      </>
    </TokenValidationContext.Provider>
  )
}

export const useTokenValidationContext = () => {
  const context = useContext(TokenValidationContext)

  if (!context) {
    throw new Error(
      'useTokenValidationContext cannot be used oustide of TokenValidationContextProvider',
    )
  }

  return context
}

export default TokenValidationContextProvider
