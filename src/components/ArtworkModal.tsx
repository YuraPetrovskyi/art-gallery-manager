import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Artwork } from "../types/artwork";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

type ArtworkModalProps = {
  artwork: Artwork;
  onHide: () => void;
  onUpdate: (updatedArtwork: Artwork) => void;
  onDelete: (id: string) => void;
};

const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onHide, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(artwork.title);
  const [artist, setArtist] = useState(artwork.artist);
  const [type, setType] = useState(artwork.type);
  const [price, setPrice] = useState(artwork.price.toString());
  const [availability, setAvailability] = useState(artwork.availability);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 

  const handleSaveChanges = () => {
    const updatedArtwork: Artwork = {
      ...artwork,
      title,
      artist,
      type,
      price: parseFloat(price),
      availability,
    };
    onUpdate(updatedArtwork);
    setIsEditing(false);
  };

  return (
    <>
      <Modal show={true} onHide={onHide} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Artwork" : artwork.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src="src/img/3.jpg"
            alt={artwork.title}
            className="w-100 mb-3"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
          {isEditing ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Artist</Form.Label>
                <Form.Control type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="painting">Painting</option>
                  <option value="sculpture">Sculpture</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Availability</Form.Label>
                <Form.Select value={availability.toString()} onChange={(e) => setAvailability(e.target.value === "true")}>
                  <option value="true">For Sale</option>
                  <option value="false">Exhibition Only</option>
                </Form.Select>
              </Form.Group>
            </Form>
          ) : (
            <>
              <p><strong>Artist:</strong> {artwork.artist}</p>
              <p><strong>Type:</strong> {artwork.type}</p>
              <p><strong>Price:</strong> ${artwork.price}</p>
              <p><strong>Availability:</strong> {artwork.availability ? "For Sale" : "Exhibition Only"}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            </>
          ) : (
            <>
              <Button variant="warning" onClick={() => setIsEditing(true)}>Edit</Button>
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
              <Button variant="secondary" onClick={onHide}>Close</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>

      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDelete(artwork.id);
          setShowDeleteModal(false);
          onHide();
        }}
      />
    </>
  );
};

export default ArtworkModal;
