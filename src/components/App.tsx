import { Routes, Route } from 'react-router-dom'
import Login from './login/Login'
import Register from './register/Register'
import Menu from './Menu'
import UserProfile from './UserProfile'
import Prizes from './prizes/Prizes'
import ContainerWithNav from './ContainerWithNav'
import { UserProfileProps } from './UserProfile'
import { routes } from '../data/routes'
import '../assets/scss/style.scss'

type UserProfileOmit = Omit<UserProfileProps, 'onDeleteProfile'>

const App = () => {
  const userData: UserProfileOmit = {
    username: 'Mike',
    email: 'mike@gmail.com',
    pinCodes: ['1234', '5678', '9012'],
  }

  const handleDeleteProfile = () => {
    console.log('Profile deleted')
  }

  return (
    <>
      <Routes>
        <Route
          path={routes.prizes}
          element={
            <ContainerWithNav>
              <Prizes />
            </ContainerWithNav>
          }
        />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
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
      </Routes>
    </>
  )
}

export default App
