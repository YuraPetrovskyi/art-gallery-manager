import React, { useState, useEffect } from "react";
import { Artwork } from "../types/artwork";
import FilterBar from "./FilterBar";
import AddArtworkForm from "./AddArtworkForm";
import { mockArtworks } from "../data/mockData"; // Імпортуємо mock-дані

// Ключ для локального сховища
const STORAGE_KEY = "art_gallery_artworks";

const ArtworkList: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const savedArtworks = localStorage.getItem(STORAGE_KEY);
    return savedArtworks ? JSON.parse(savedArtworks) : mockArtworks;
  });

  const [sortOrder, setSortOrder] = useState<string>("");
  const [artistFilter, setArtistFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(artworks));
  }, [artworks]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleFilterChange = (artist: string, type: string) => {
    setArtistFilter(artist);
    setTypeFilter(type);
  };

  const handleAddArtwork = (newArtwork: Artwork) => {
    setArtworks((prevArtworks) => [...prevArtworks, newArtwork]);
  };

  const handleDeleteArtwork = (id: string) => {
    setArtworks((prevArtworks) => prevArtworks.filter((artwork) => artwork.id !== id));
  };

  // Фільтруємо роботи
  const filteredArtworks = artworks.filter((artwork) => {
    return (
      (artistFilter ? artwork.artist.toLowerCase().includes(artistFilter.toLowerCase()) : true) &&
      (typeFilter ? artwork.type === typeFilter : true)
    );
  });

  // Сортуємо після фільтрації
  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div>
      <h2>Artwork Gallery</h2>

      <FilterBar onFilterChange={handleFilterChange} />

      <select onChange={handleSortChange} value={sortOrder}>
        <option value="">Sort by</option>
        <option value="asc">Price ↑</option>
        <option value="desc">Price ↓</option>
      </select>

      <ul>
        {sortedArtworks.map((artwork) => (
          <li key={artwork.id}>
            <strong>{artwork.title}</strong> by {artwork.artist} - ${artwork.price}{" "}
            {artwork.availability ? "(For Sale)" : "(Exhibition Only)"}
            <button onClick={() => handleDeleteArtwork(artwork.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <AddArtworkForm onAddArtwork={handleAddArtwork} />

    </div>
  );
};

export default ArtworkList;
