import { useState } from 'react'
import { Modal as BSModal, Button, CloseButton, Image } from 'react-bootstrap'
import { PrizeProps } from '@components/prizes/Prize'
import { useAuthContext } from '@components/store/AuthContext'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setUserPrizes } from '@services/models/prize'

type ModalProps = {
  showModal: boolean
  closeModal: () => void
} & PrizeProps

const Modal = ({
  showModal,
  closeModal,
  id,
  title,
  description,
  amount,
  image_url: imageUrl,
  assigned_users_count: assignedUsersCount,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { localId } = useAuthContext()

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await setUserPrizes({
        user_id: localId,
        prize_id: id,
      })
    } catch (e) {
      // TODO error handling
    } finally {
      setIsLoading(false)
    }
  }

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
            src={imageUrl}
            alt={title}
            className="position-absolute top-50 start-50 translate-middle w-100 h-100 object-fit-cover"
          />
        </div>
        <h4>{title}</h4>
        <div data-testid="remaining-and-total-entries">
          <FontAwesomeIcon
            icon={faUsers}
            fixedWidth
            className="text-danger me-1"
          />
          <span className="visually-hidden">
            Number of remaining entries and number of total entries:
          </span>
          <span className="text-danger">{assignedUsersCount}</span>
          <span className="visually-hidden">out of</span>
          <span className="slash-content"></span>
          {amount}
        </div>
        <p>{description}</p>
      </BSModal.Body>
      <BSModal.Footer>
        <Button
          type="submit"
          variant="danger"
          className="btn-lg w-100 text-white text-uppercase rounded-pill"
          onClick={handleClick}
          disabled={isLoading}
        >
          Enter the raffle
        </Button>
      </BSModal.Footer>
    </BSModal>
  )
}

export default Modal
