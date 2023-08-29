import { Row, Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

type PrizeCardProps = {
  onClick: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  imageUrl: string
  altText: string
  title: string
  stock: number
  total: number
  codesCount: number
}

const PrizeCard = ({
  onClick,
  onKeyDown,
  imageUrl,
  altText,
  title,
  stock,
  total,
  codesCount,
}: PrizeCardProps) => {
  return (
    <Card
      role="button"
      tabIndex={0}
      className="hover-effect mb-3"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <Row className="g-0">
        <Col xs={4} md={3} className="position-relative">
          <div className="position-absolute top-0 end-0 bottom-0 start-0 d-flex justify-content-center align-items-center">
            <Card.Img
              src={imageUrl}
              className="rounded-end-0 w-100 h-100 object-fit-cover"
              alt={altText}
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
  )
}

export default PrizeCard
