import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { Artwork } from "../types/artwork";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const API_URL = "http://localhost:8000/api/artworks";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };


  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || title.length > 99) {
      setError("Title is required (max 99 characters).");
      return;
    }
    if (!artist.trim()) {
      setError("Artist name is required.");
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    try {
      setLoading(true);

      // await axios.put(`${API_URL}/${artwork.id}`, updatedArtwork);
      // onUpdate(updatedArtwork);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("type", type);
      formData.append("price", String(Number(price)));
      formData.append("availability", String(availability));

      if (image) {
        formData.append("image", image);
      }

      // console.log("sending formData:", [...formData.entries()]);

      const response = await axios.put(`${API_URL}/${artwork.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpdate(response.data);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error("Error updating artwork:", error);
      setError("Failed to update artwork.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArtwork = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${artwork.id}`); // Видаляємо з бази
      onDelete(artwork.id); // Видаляємо з локального стану
      setShowDeleteModal(false);
      onHide(); // Закриваємо модальне вікно після видалення
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("Failed to delete artwork.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={true} onHide={onHide} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-secondary text-break">{isEditing ? "Edit Artwork" : artwork.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <img
            src={artwork.imagepath ? `http://localhost:8000/${artwork.imagepath}` : "http://localhost:8000/uploads/default.jpg"}
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
                <Form.Control 
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Math.floor(Number(e.target.value)).toString())} 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Availability</Form.Label>
                <Form.Select value={availability.toString()} onChange={(e) => setAvailability(e.target.value === "true")}>
                  <option value="true">For Sale</option>
                  <option value="false">Exhibition Only</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Update Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
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

        {error && <p className="text-danger text-center">{error}</p>}

        <Modal.Footer>
          {isEditing ? (
            <div className="d-flex w-100 justify-content-between">
              <Button className="w-50" variant="dark" onClick={handleSaveChanges} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Save Changes"}
              </Button>
              <Button 
                className="w-25" variant="secondary" onClick={() => {
                  setIsEditing(false);
                  setError(null);
              }}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="d-flex w-100 justify-content-between">
              <Button className="w-25" variant="secondary"  onClick={() => setIsEditing(true)}>Edit</Button>
              <Button className="w-25 p-0" variant="secondary" onClick={() => setShowDeleteModal(true)}>Remove</Button>
              <Button className="w-25" variant="dark" onClick={onHide}>Close</Button>
            </div>            
          )}
        </Modal.Footer>
      </Modal>

      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteArtwork}
        artworkTitle={artwork.title}
        loading={loading}
      />
    </>
  );
};

export default ArtworkModal;
