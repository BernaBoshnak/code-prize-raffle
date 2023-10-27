import { Container, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faPersonWalkingArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { routes } from '../data/routes'
import { useAuthContext } from './store/AuthContext'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
  const { logout } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(routes.login)
  }

  return (
    <Container className="py-5">
      <ListGroup>
        <ListGroup.Item action active={false} href={routes.profile}>
          <FontAwesomeIcon icon={faUser} fixedWidth />
          <span className="ps-2 fs-5">Profile</span>
        </ListGroup.Item>
        <ListGroup.Item
          onClick={handleLogout}
          action
          active={false}
          className="fs-5 text-danger"
        >
          <FontAwesomeIcon icon={faPersonWalkingArrowRight} fixedWidth />
          <span className="ps-2">Exit</span>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  )
}

export default Menu
