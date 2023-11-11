import { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Prize as TPrize } from '../../types/api/prize'
import Modal from './Modal'

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
            <Card.Body data-testid="card-body">
              <Card.Title className="fs-4">{title}</Card.Title>
              <Card.Text as="div">
                <div
                  className="mb-2 text-truncate"
                  data-testid="prizes-in-stock"
                >
                  <span className="me-1">In Stock:</span>
                  <span className="text-danger">{stock}</span>
                  <span className="visually-hidden">out of</span>
                  <span className="slash-content"></span>
                  {total}
                </div>
                <div data-testid="required-number-of-codes">
                  <FontAwesomeIcon
                    icon={faCoins}
                    fixedWidth
                    className="text-danger me-1"
                  />
                  <span className="visually-hidden">
                    Required number of codes:
                  </span>
                  {codesCount}
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
