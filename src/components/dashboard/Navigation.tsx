import { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouseUser,
  faBarcode,
  faGift,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import { routes } from '../../data/routes'
import CodeModal from '../CodeModal'

const Navigation = () => {
  const [showCodeModal, setShowCodeModal] = useState(false)

  const openCodeModal = () => setShowCodeModal(true)
  const closeCodeModal = () => setShowCodeModal(false)

  return (
    <>
      <Nav
        justify
        defaultActiveKey={routes.home}
        className="sticky-bottom border-0 border-top border bg-light flex-shrink-0 flex-nowrap overflow-x-auto footer-nav"
      >
        <Nav.Item>
          <Nav.Link href={routes.home}>
            <FontAwesomeIcon icon={faHouseUser} fixedWidth />
            <div>Home</div>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" onClick={openCodeModal}>
            <FontAwesomeIcon icon={faBarcode} fixedWidth />
            <div>Code</div>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={routes.awards}>
            <FontAwesomeIcon icon={faGift} fixedWidth />
            <div>Awards</div>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={routes.menu}>
            <FontAwesomeIcon icon={faBars} fixedWidth />
            <div>More</div>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CodeModal showModal={showCodeModal} closeModal={closeCodeModal} />
    </>
  )
}

export default Navigation
