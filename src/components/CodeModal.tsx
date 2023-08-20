import { Modal, Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faCheck } from '@fortawesome/free-solid-svg-icons'

interface CodeModalProps {
  showModal: boolean
  closeModal: () => void
}

const CodeModal: React.FC<CodeModalProps> = ({ showModal, closeModal }) => {
  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      dialogClassName="modal-dialog modal-dialog-centered"
    >
      <Modal.Header className="border-bottom-0" closeButton>
        <FontAwesomeIcon icon={faCoins} fixedWidth />
        <div className="p-1 fw-semibold">2</div>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center fw-semibold">Enter PIN code</p>
        <Form.Control
          className="text-center border-0"
          type="text"
          placeholder="XXXXXXXXXXXXXXXX"
        />
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <Button
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
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CodeModal
