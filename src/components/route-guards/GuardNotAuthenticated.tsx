import { useAuthContext } from '../store/AuthContext'
import { Navigate, NavigateProps, Outlet } from 'react-router-dom'

const GuardNotAuthenticated = ({ to }: Pick<NavigateProps, 'to'>) => {
  const { isLoggedIn } = useAuthContext()

  return isLoggedIn ? <Outlet /> : <Navigate to={to} />
}

export default GuardNotAuthenticated
