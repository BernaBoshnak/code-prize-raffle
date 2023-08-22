import { Container, Card, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarcode, faUser } from '@fortawesome/free-solid-svg-icons'

export interface UserProfileProps {
  username: string
  email: string
  pinCodes: string[]
  onDeleteProfile: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  email,
  pinCodes,
  onDeleteProfile,
}) => {
  return (
    <Container className="py-5">
      <Card>
        <Card.Header>
          <h4 className="text-center">Basic information</h4>
        </Card.Header>
        <Card.Body className="p-5">
          <Row className="mx-md-5">
            <Col xs={12} md={6} className="mb-4">
              <div>
                <FontAwesomeIcon icon={faBarcode} fixedWidth />
                <span className="ps-2">Entered PIN Codes</span>
              </div>
              <ListGroup variant="flush" as="ul" className="d-inline-block">
                {pinCodes.map((code, index) => (
                  <ListGroup.Item
                    key={index}
                    as="li"
                    className="bg-transparent"
                  >
                    {code}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col xs={12} md={6} className="mb-4">
              <div>
                <FontAwesomeIcon icon={faUser} fixedWidth />
                <span className="ps-2">User</span>
              </div>
              <div className="py-1">Username: {username}</div>
              <div className="py-1">Email: {email}</div>
              <br />
              <Button variant="danger" onClick={onDeleteProfile}>
                Delete Profile
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default UserProfile
