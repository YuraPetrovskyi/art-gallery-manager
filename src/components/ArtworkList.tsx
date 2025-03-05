import React, { useState } from "react";
import { Artwork } from "../types/artwork";

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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setSortOrder(order);
  
    const sortedArtworks = [...artworks].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
  
    setArtworks(sortedArtworks);
  };

  return (
    <div>
      <h2>Artwork Gallery</h2>
      <label>Sort by: </label>
      <select onChange={handleSortChange} value={sortOrder}>
        <option value="">Select</option>
        <option value="asc">Price: Low to High (↑)</option>
        <option value="desc">Price: High to Low (↓)</option>
      </select>
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id}>
            <strong>{artwork.title}</strong> by {artwork.artist} - ${artwork.price}{" "}
            {artwork.availability ? "(Available)" : "(Sold Out)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtworkList;
