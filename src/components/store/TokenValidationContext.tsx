import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from 'react'
import * as fetchUtils from '../../services/api/fetch'
import InvalidTokenModal from '../modals/InvalidTokenModal'

type TTokenValidationContext = {
  shouldRedirectToLogin: boolean
  postJson: <T>(...args: Parameters<typeof fetchUtils.postJson>) => Promise<T>
}

const TokenValidationContext = createContext<
  TTokenValidationContext | undefined
>(undefined)

const TokenValidationContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
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
      }, 3000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [isValidToken])

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
