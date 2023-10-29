import { useAuthContext } from '../store/AuthContext'
import { Navigate, Outlet, NavigateProps } from 'react-router-dom'

const GuardAuthenticated = ({ to }: Pick<NavigateProps, 'to'>) => {
  const { isLoggedIn } = useAuthContext()

  return isLoggedIn ? <Navigate to={to} /> : <Outlet />
}

export default GuardAuthenticated
