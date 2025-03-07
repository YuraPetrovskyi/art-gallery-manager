import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { Artwork } from "../types/artwork";

const API_URL = "http://localhost:8000/api/artworks";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!title.trim() || title.length > 99) {
  //     setError("Title is required (max 99 characters).");
  //     return;
  //   }
  //   if (!artist.trim()) {
  //     setError("Artist name is required.");
  //     return;
  //   }
  //   if (!price || isNaN(Number(price)) || Number(price) <= 0) {
  //     setError("Price must be a positive number.");
  //     return;
  //   }

  //   const newArtwork: Artwork = {
  //     id: Math.random().toString(36).substr(2, 9),
  //     title,
  //     artist,
  //     type,
  //     price: parseFloat(price),
  //     availability,
  //   };

  //   onAddArtwork(newArtwork);
  //   setTitle("");
  //   setArtist("");
  //   setType("painting");
  //   setPrice("");
  //   setAvailability(true);
  //   setError(null);
  //   onHide();
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!title || !artist || !price) return alert("Please fill all required fields.");
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

    const newArtwork = { title, artist, type, price: Number(price), availability };

    try {
      setLoading(true);
      const response = await axios.post(API_URL, newArtwork);
      onAddArtwork(response.data);
      setError(null);
      onHide();
    } catch (error) {
      console.error("Error adding artwork:", error);
      setError("Failed to add artwork.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="bg-white">
        <Modal.Title className="fw-bold text-secondary">Add New Artwork</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
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

          {error && <p className="text-center  text-danger">{error}</p>}

          <div className="d-flex justify-content-between">
            <Button variant="dark" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Add Artwork"}
            </Button>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
          </div>
          
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddArtworkModal;