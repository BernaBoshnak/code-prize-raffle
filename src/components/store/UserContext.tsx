import { useState, createContext, useContext, useMemo, useEffect } from 'react'
import { GetUserDataResponse } from '@services/api/response/user'
import { getUser } from '@services/models/user'
import { useAuthContext } from './AuthContext'

type TUserContext = {
  userData: GetUserDataResponse | undefined
}

const UserContext = createContext<TUserContext | undefined>(undefined)

const UserContextProvider = (props: { children?: React.ReactNode }) => {
  const [userData, setUserData] = useState<TUserContext['userData']>()
  const { localId } = useAuthContext()

  useEffect(() => {
    if (localId) {
      // TODO error handling
      getUser(localId).then((data) => {
        const userData = data as GetUserDataResponse
        setUserData(userData)
      })
    }
  }, [localId])

  const contextValue: TUserContext = useMemo(
    () => ({
      userData,
    }),
    [userData],
  )

  return <UserContext.Provider value={contextValue} {...props} />
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error(
      'useUserContext cannot be used oustide of UserContextProvider',
    )
  }

  return context
}

export default UserContextProvider
