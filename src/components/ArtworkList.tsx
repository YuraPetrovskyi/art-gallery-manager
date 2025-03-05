import React, { useState } from "react";
import { Artwork } from "../types/artwork";
import FilterBar from "./FilterBar";
import AddArtworkForm from "./AddArtworkForm";

const mockArtworks: Artwork[] = [
  {
    id: "1",
    title: "Starry Night",
    artist: "Vincent van Gogh",
    type: "painting",
    price: 5000,
    availability: true,
  },
  {
    id: "2",
    title: "The Persistence of Memory",
    artist: "Salvador Dali",
    type: "painting",
    price: 7000,
    availability: false,
  },
  {
    id: "3",
    title: "David",
    artist: "Michelangelo",
    type: "sculpture",
    price: 12000,
    availability: true,
  },
];

const ArtworkList: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(mockArtworks);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [artistFilter, setArtistFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

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
          </li>
        ))}
      </ul>

      <AddArtworkForm onAddArtwork={handleAddArtwork} />

    </div>
  );
};

export default ArtworkList;
