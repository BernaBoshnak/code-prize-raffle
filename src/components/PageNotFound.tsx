import { Alert, Col, Container, Row } from 'react-bootstrap'

const PageNotFound = () => {
  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100 w-100">
        <Col md={6} lg={4}>
          <Alert variant="danger">
            <h1 className="text-center">404</h1>
            <h2 className="text-center">Page Not Found</h2>
            <p className="text-center">
              The page you are looking for does not exist.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default PageNotFound
