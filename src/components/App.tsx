import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import Register from './Register'
import Menu from './Menu'
import UserProfile from './UserProfile'
import { UserProfileProps } from './UserProfile'
import '../assets/scss/style.scss'
import { routes } from '../data/routes'

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
        <Route path={routes.home} element={<Dashboard />} />
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
