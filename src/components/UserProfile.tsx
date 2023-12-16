import { useState } from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Alert,
} from 'react-bootstrap'
import useAbortController from '@components/hooks/useAbortController'
import { useAuthContext } from '@components/store/AuthContext'
import { useUserContext } from '@components/store/UserContext'
import { formatErrorMessage } from '@components/utils/formMessage'
import { faBarcode, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteUser } from '@services/models/user'

const UserProfile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { userData } = useUserContext()
  const { idToken, logout, localId } = useAuthContext()
  const controller = useAbortController()

  const handleDeleteProfile = () => {
    setError(null)

    try {
      setIsLoading(true)
      if (localId && idToken) {
        deleteUser(localId, idToken, controller)
      }

      logout()
    } catch (e) {
      const error = e as { message: string }

      const message =
        e instanceof TypeError // Fetch error (e.g. no internet connection)
          ? 'Something went wrong!'
          : formatErrorMessage(error.message)

      setError(message)
    } finally {
      setIsLoading(false)
    }
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
          {error && (
            <Alert variant="danger">
              <strong>{error}</strong>
            </Alert>
          )}
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
              <Button
                variant="danger"
                onClick={handleDeleteProfile}
                disabled={isLoading}
              >
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
