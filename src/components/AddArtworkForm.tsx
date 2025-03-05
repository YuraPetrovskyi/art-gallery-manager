import React, { useState } from "react";
import { Artwork } from "../types/artwork";

type AddArtworkFormProps = {
  onAddArtwork: (newArtwork: Artwork) => void;
};

const AddArtworkForm: React.FC<AddArtworkFormProps> = ({ onAddArtwork }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [type, setType] = useState("painting");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валідація
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }
    if (title.length > 99) {
      setError("Title must be less than 99 characters.");
      return;
    }
    if (!artist.trim()) {
      setError("Artist name cannot be empty.");
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    // Створення нового об'єкта
    const newArtwork: Artwork = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      artist,
      type,
      price: parseFloat(price),
      availability,
    };

    // Додаємо арт-об'єкт
    onAddArtwork(newArtwork);

    // Очищення форми
    setTitle("");
    setArtist("");
    setType("painting");
    setPrice("");
    setAvailability(true);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="painting">Painting</option>
        <option value="sculpture">Sculpture</option>
      </select>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <select value={availability.toString()} onChange={(e) => setAvailability(e.target.value === "true")}>
        <option value="true">For Sale</option>
        <option value="false">Exhibition Only</option>
      </select>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Add Artwork</button>
    </form>
  );
};

export default AddArtworkForm;
