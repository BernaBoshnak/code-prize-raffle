import { Modal as BSModal, Button, CloseButton, Image } from 'react-bootstrap'
import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Prize as TPrize } from '../../types/api/prize'

type ModalProps = {
  showModal: boolean
  closeModal: () => void
} & Pick<TPrize, 'title' | 'description' | 'stock' | 'total' | 'image'>

const Modal = ({
  showModal,
  closeModal,
  title,
  description,
  stock,
  total,
  image,
}: ModalProps) => {
  return (
    <BSModal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={closeModal}
    >
      <BSModal.Body>
        <div className="d-flex justify-content-end">
          <CloseButton onClick={closeModal} />
        </div>
        <div className="image-wrapper mt-1 mb-3">
          <Image
            src={image.url}
            alt={image.alt}
            className="position-absolute top-50 start-50 translate-middle w-100 h-100 object-fit-cover"
          />
        </div>
        <h4>{title}</h4>
        <div data-testid="remaining-and-total-entries">
          <FontAwesomeIcon
            icon={faTicket}
            fixedWidth
            className="text-danger me-1"
          />
          <span className="visually-hidden">
            Number of remaining entries and number of total entries:
          </span>
          <span className="text-danger">{stock}</span>
          <span className="visually-hidden">out of</span>
          <span className="slash-content"></span>
          {total}
        </div>
        <p>{description}</p>
      </BSModal.Body>
      <BSModal.Footer>
        <Button
          type="submit"
          variant="danger"
          className="btn-lg w-100 text-white text-uppercase rounded-pill"
        >
          Enter the raffle
        </Button>
      </BSModal.Footer>
    </BSModal>
  )
}

export default Modal
