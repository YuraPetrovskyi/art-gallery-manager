import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

type DeleteConfirmationModalProps = {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  artworkTitle: string | null;
  loading?: boolean;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  show, 
  onHide, 
  onConfirm, 
  artworkTitle, 
  loading = false 
}) => {
  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-dialog-centered" backdrop="static">
      <Modal.Header closeButton className="bg-light border-top shadow-lg">
        <Modal.Title className="fw-bold">Confirm Removing</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-break">
        {artworkTitle ? (
          <>Are you sure you want to remove <strong>{artworkTitle}</strong>?</>
        ) : (
          <>Are you sure you want to remove this artwork?</>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-light border-bottom shadow-lg">
        <div className="d-flex w-100 justify-content-between">
          <Button variant="secondary" onClick={onConfirm} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Remove"}
          </Button>
          <Button variant="dark" onClick={onHide} disabled={loading}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;