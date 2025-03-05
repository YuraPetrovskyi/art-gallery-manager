import React, { useState, useEffect } from "react";
import { Artwork } from "../types/artwork";
import { mockArtworks } from "../data/mockData";
import { loadArtworks, saveArtworks } from "../utils/localStorage";
import FilterBar from "./FilterBar";
import AddArtworkForm from "./AddArtworkForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const ArtworkList: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const savedArtworks = loadArtworks();
    return savedArtworks.length > 0 ? savedArtworks : mockArtworks;
  });

  useEffect(() => {
    saveArtworks(artworks);
  }, [artworks]);

  const [sortOrder, setSortOrder] = useState<string>("");
  const [artistFilter, setArtistFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [artworkToDelete, setArtworkToDelete] = useState<string | null>(null);

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
    setArtworkToDelete(id);
    setShowModal(true);
  };

  const confirmDeleteArtwork = () => {
    if (artworkToDelete) {
      setArtworks((prevArtworks) => prevArtworks.filter((artwork) => artwork.id !== artworkToDelete));
      setShowModal(false);
      setArtworkToDelete(null);
    }
  };

  const filteredArtworks = artworks.filter((artwork) => {
    return (
      (artistFilter ? artwork.artist.toLowerCase().includes(artistFilter.toLowerCase()) : true) &&
      (typeFilter ? artwork.type === typeFilter : true)
    );
  });

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

      <DeleteConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDeleteArtwork}
      />
    </div>
  );
};

export default ArtworkList;
