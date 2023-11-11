import { Navigate, NavigateProps, Outlet } from 'react-router-dom'
import { useAuthContext } from '@components/store/AuthContext'

const GuardNotAuthenticated = ({ to }: Pick<NavigateProps, 'to'>) => {
  const { isLoggedIn } = useAuthContext()

  return isLoggedIn ? <Outlet /> : <Navigate to={to} />
}

export default GuardNotAuthenticated
