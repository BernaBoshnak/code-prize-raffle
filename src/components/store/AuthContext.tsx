import { createContext, useState, useContext, useMemo } from 'react'

type IAuthContext = {
  token: string | undefined
  isLoggedIn: boolean
  storeToken: (token: NonNullable<IAuthContext['token']>) => void
  logout: () => void
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

const retrieveStoredToken = () => {
  const token = localStorage.getItem('token')

  if (!token) {
    return
  }

  return {
    token,
  }
}

const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const tokenData = retrieveStoredToken()
  const initialToken = tokenData?.token

  const [token, setToken] = useState(initialToken)
  const isLoggedIn = Boolean(token)

  const logout = () => {
    setToken(undefined)
    localStorage.removeItem('token')
  }

  const storeToken = (token: string) => {
    setToken(token)
    localStorage.setItem('token', token)
  }

  const contextValue: IAuthContext = useMemo(
    () => ({
      token,
      isLoggedIn,
      storeToken,
      logout,
    }),
    [isLoggedIn, token],
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
