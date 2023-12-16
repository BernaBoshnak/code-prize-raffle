import { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { TPrizes } from '@components/prizes/Prizes'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PrizeId, Prize as TPrize } from '@services/api/response/prize'
import Modal from './Modal'

export interface PrizeProps extends TPrize {
  id: PrizeId
  setPrizes: React.Dispatch<React.SetStateAction<TPrizes | undefined>>
}

const Prize = (props: PrizeProps) => {
  const [showModal, setShowModal] = useState(false)
  const {
    image_url: imageUrl,
    title,
    amount,
    codes_count: codesCount,
    assigned_users_count: assignedUsersCount,
  } = props

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
                src={imageUrl}
                className="rounded-end-0 w-100 h-100 object-fit-cover"
                alt={title}
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
                  <span className="text-danger">{assignedUsersCount}</span>
                  <span className="visually-hidden">out of</span>
                  <span className="slash-content"></span>
                  {amount}
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
        showModal={showModal}
        closeModal={closeModal}
        {...props}
        setPrizes={props.setPrizes}
      />
    </>
  )
}

export default Prize
