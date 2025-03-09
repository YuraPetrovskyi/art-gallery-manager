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
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setTitle("");
    setArtist("");
    setType("painting");
    setPrice("");
    setAvailability(true);
    setImage(null);
    setError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

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


    try {
      setLoading(true);

      // const response = await axios.post(API_URL, newArtwork);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("type", type);
      formData.append("price", String(Number(price)));
      formData.append("availability", String(availability));
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onAddArtwork(response.data);
      resetForm();
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

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          </Form.Group>

          {error && <p className="text-center  text-danger">{error}</p>}

          <div className="d-flex justify-content-between">
            <Button variant="dark" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Add Artwork"}
            </Button>
            <Button variant="secondary" onClick={() => {
              resetForm();
              onHide();
            }}>
              Cancel
            </Button>
          </div>
          
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddArtworkModal;