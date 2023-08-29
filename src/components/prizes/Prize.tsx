import { useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal'
import { Prize as TPrize } from '../../types/api/prize'

const Prize = ({
  image,
  title,
  description,
  stock,
  total,
  codesCount,
}: TPrize) => {
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    setShowModal(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setShowModal(true)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        className="hover-effect mb-3"
        onClick={handleClick}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        <Row className="g-0">
          <Col xs={4} md={3} className="position-relative">
            <div className="position-absolute top-0 end-0 bottom-0 start-0 d-flex justify-content-center align-items-center">
              <Card.Img
                src={image.url}
                className="rounded-end-0 w-100 h-100 object-fit-cover"
                alt={image.alt}
              />
            </div>
          </Col>
          <Col xs={8} md={9}>
            <Card.Body>
              <Card.Title className="fs-4">{title}</Card.Title>
              <Card.Text as="div">
                <div className="mb-2 text-truncate">
                  In Stock: <span className="text-danger">{stock}</span>/{total}
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faCoins}
                    fixedWidth
                    className="text-danger"
                  />
                  &nbsp;{codesCount}
                </div>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Modal
        title={title}
        description={description}
        stock={stock}
        total={total}
        image={image}
        showModal={showModal}
        closeModal={closeModal}
      />
    </>
  )
}

export default Prize
