import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Artwork } from "../types/artwork";

type AddArtworkModalProps = {
  show: boolean;
  onHide: () => void;
  onAddArtwork: (newArtwork: Artwork) => void;
};

const AddArtworkModal: React.FC<AddArtworkModalProps> = ({ show, onHide, onAddArtwork }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [type, setType] = useState("painting");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
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

    const newArtwork: Artwork = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      artist,
      type,
      price: parseFloat(price),
      availability,
    };

    onAddArtwork(newArtwork);
    setTitle("");
    setArtist("");
    setType("painting");
    setPrice("");
    setAvailability(true);
    setError(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Artwork</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button variant="dark" type="submit">
            Add Artwork
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddArtworkModal;