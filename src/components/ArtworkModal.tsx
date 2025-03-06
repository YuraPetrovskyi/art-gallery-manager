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
          <Modal.Title className="fw-bold text-secondary text-break">{isEditing ? "Edit Artwork" : artwork.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
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
              <p className="text-break"><strong>Artist:</strong> {artwork.artist}</p>
              <p className="text-break"><strong>Type:</strong> {artwork.type}</p>
              <p ><strong>Price:</strong> ${artwork.price}</p>
              <p><strong>Availability:</strong> {artwork.availability ? "For Sale" : "Exhibition Only"}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isEditing ? (
            <div className="d-flex w-100 justify-content-between">
              <Button className="w-50" variant="dark" onClick={handleSaveChanges}>Save Changes</Button>
              <Button className="w-auto" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          ) : (
            <div className="d-flex w-100 justify-content-between">
              <Button className="w-auto" variant="secondary" onClick={() => setIsEditing(true)}>Edit</Button>
              <Button className="w-auto" variant="secondary" onClick={() => setShowDeleteModal(true)}>Remove</Button>
              <Button className="w-auto" variant="dark" onClick={onHide}>Close</Button>
            </div>
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
        artworkTitle={artwork.title}
      />
    </>
  );
};

export default ArtworkModal;
