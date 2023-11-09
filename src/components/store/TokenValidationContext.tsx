import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react'
import { Navigate } from 'react-router-dom'
import { routes } from '../../data/routes'
import * as fetchUtils from '../../services/api/fetch'

type TTokenValidationContext = {
  isValidToken: boolean
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

  const contextValue = useMemo(
    () => ({
      isValidToken,
      postJson,
    }),
    [isValidToken, postJson],
  )

  return (
    <TokenValidationContext.Provider value={contextValue}>
      <>
        {children}
        {!isValidToken && <Navigate to={routes.login} />}
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
