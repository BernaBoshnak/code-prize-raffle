import React from 'react'
import { Modal } from 'react-bootstrap'

const InvalidTokenModal = (props: React.ComponentProps<typeof Modal>) => {
  return (
    <Modal
      {...props}
      dialogClassName="modal-dialog modal-dialog-centered"
      data-testid="invalid-token-modal"
    >
      <Modal.Header>
        <h4>Invalid session</h4>
      </Modal.Header>
      <Modal.Body>
        You will be redirected to the login page in few seconds.
      </Modal.Body>
    </Modal>
  )
}

export default InvalidTokenModal
