import { Navigate, Route, Routes } from 'react-router-dom'
import ContainerWithNav from '@components/ContainerWithNav'
import Login from '@components/login/Login'
import Menu from '@components/Menu'
import PageNotFound from '@components/PageNotFound'
import Prizes from '@components/prizes/Prizes'
import Register from '@components/register/Register'
import GuardAuthenticated from '@components/route-guards/GuardAuthenticated'
import GuardNotAuthenticated from '@components/route-guards/GuardNotAuthenticated'
import UserProfile from '@components/UserProfile'
import '@styles/style.scss'
import { routes } from '../data/routes'

const App = () => {
  return (
    <Routes>
      <Route element={<GuardAuthenticated to={routes.prizes} />}>
        <Route path={routes.home} element={<Navigate to={routes.login} />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
      </Route>
      <Route element={<GuardNotAuthenticated to={routes.login} />}>
        <Route path={routes.home} element={<Navigate to={routes.prizes} />} />
        <Route
          path={routes.prizes}
          element={
            <ContainerWithNav>
              <Prizes />
            </ContainerWithNav>
          }
        />
        <Route path={routes.menu} element={<Menu />} />
        <Route path={routes.profile} element={<UserProfile />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
