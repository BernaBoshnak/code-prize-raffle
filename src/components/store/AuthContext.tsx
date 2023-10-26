import { createContext, useState, useContext } from 'react'

type IAuthContext = {
  token: string | undefined
  isLoggedIn: boolean
  storeToken: (token: NonNullable<IAuthContext['token']>) => void
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

  const initialToken: string | undefined = tokenData?.token

  const [token, setToken] = useState(initialToken)
  const isLoggedIn = Boolean(token)

  const storeToken = (token: string) => {
    setToken(token)

    localStorage.setItem('token', token)
  }

  const contextValue: IAuthContext = {
    token,
    isLoggedIn,
    storeToken,
  }

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
