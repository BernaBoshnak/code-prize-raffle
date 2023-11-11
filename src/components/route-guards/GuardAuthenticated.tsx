import { Navigate, NavigateProps, Outlet } from 'react-router-dom'
import { useAuthContext } from '@components/store/AuthContext'

const GuardAuthenticated = ({ to }: Pick<NavigateProps, 'to'>) => {
  const { isLoggedIn } = useAuthContext()

  return isLoggedIn ? <Navigate to={to} /> : <Outlet />
}

export default GuardAuthenticated
