import { Navigate, Route, Routes } from 'react-router-dom'
import ContainerWithNav from '@components/ContainerWithNav'
import Login from '@components/login/Login'
import Menu from '@components/Menu'
import PageNotFound from '@components/PageNotFound'
import Prizes from '@components/prizes/Prizes'
import Register from '@components/register/Register'
import GuardAuthenticated from '@components/route-guards/GuardAuthenticated'
import GuardNotAuthenticated from '@components/route-guards/GuardNotAuthenticated'
import UserProfile, { UserProfileProps } from '@components/UserProfile'
import '@styles/style.scss'
import { routes } from '../data/routes'

type UserProfileOmit = Omit<UserProfileProps, 'onDeleteProfile'>

const App = () => {
  const userData: UserProfileOmit = {
    username: 'Mike',
    email: 'mike@gmail.com',
    pinCodes: ['1234', '5678', '9012'],
  }

  const handleDeleteProfile = () => {
    // Profile deleted
  }

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
        <Route
          path={routes.profile}
          element={
            <UserProfile
              username={userData.username}
              email={userData.email}
              pinCodes={userData.pinCodes}
              onDeleteProfile={handleDeleteProfile}
            />
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
