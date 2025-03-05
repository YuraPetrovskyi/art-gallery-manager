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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    const sortedArtworks = [...artworks].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setArtworks(sortedArtworks);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <h2>Artwork Gallery</h2>
      <button onClick={handleSort}>
        Sort by price ({sortOrder === "asc" ? "Lowest to Highest" : "Highest to Lowest"})
      </button>
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
