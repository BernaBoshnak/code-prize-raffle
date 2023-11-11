import { useId } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { faCheck, faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface CodeModalProps {
  showModal: boolean
  closeModal: () => void
}

const CodeModal = ({ showModal, closeModal }: CodeModalProps) => {
  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      dialogClassName="modal-dialog modal-dialog-centered"
    >
      <Modal.Header className="border-bottom-0" closeButton>
        <FontAwesomeIcon icon={faCoins} fixedWidth />
        <div className="p-1 fw-semibold" data-testid="total-amount-of-codes">
          <span className="visually-hidden">Total amount of your codes:</span>50
        </div>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group controlId={useId()}>
            <Form.Label className="text-center fw-semibold d-block">
              Enter PIN code
            </Form.Label>
            <Form.Control
              className="text-center border-0"
              type="text"
              placeholder="XXXXXXXXXXXXXXXX"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button
            type="submit"
            variant="success"
            onClick={closeModal}
            className="position-relative rounded-circle p-4"
          >
            <FontAwesomeIcon
              icon={faCheck}
              fade
              size="lg"
              fixedWidth
              className="position-absolute top-50 start-50 translate-middle"
            />
            <span className="visually-hidden">Submit</span>
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CodeModal
