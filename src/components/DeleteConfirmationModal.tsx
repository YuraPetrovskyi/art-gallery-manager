import React from "react";
import { Modal, Button } from "react-bootstrap";

type DeleteConfirmationModalProps = {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this artwork?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;