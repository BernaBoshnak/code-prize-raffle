import { Modal as BSModal, Image, Button, CloseButton } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket } from '@fortawesome/free-solid-svg-icons'
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
        <div>
          <FontAwesomeIcon icon={faTicket} fixedWidth className="text-danger" />
          &nbsp;
          <span className="text-danger">{stock}</span>/{total}
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
