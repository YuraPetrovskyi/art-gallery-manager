import React from "react";

type Artwork = {
  id: string;
  title: string;
  artist: string;
  type: string;
  price: number;
  availability: boolean;
};

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
];

const ArtworkList: React.FC = () => {
  return (
    <div>
      <h2>Artwork Gallery</h2>
      <ul>
        {mockArtworks.map((artwork) => (
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
