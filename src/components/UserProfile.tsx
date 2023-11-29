import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useUserContext } from '@components/store/UserContext'
import { faBarcode, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserProfile: React.FC = () => {
  const { userData } = useUserContext()

  const handleDeleteProfile = () => {
    // console.log('Profile deleted')
  }

  if (!userData) {
    // TODO loading component
    return null
  }

  const { codes, email, user_name: userName } = userData

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
                {codes.map((code, index) => (
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
              <div className="py-1">Username: {userName}</div>
              <div className="py-1">Email: {email}</div>
              <br />
              <Button variant="danger" onClick={handleDeleteProfile}>
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
