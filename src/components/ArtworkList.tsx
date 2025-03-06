import React, { useState, useEffect } from "react";
import { Artwork } from "../types/artwork";
import { mockArtworks } from "../data/mockData";
import { loadArtworks, saveArtworks } from "../utils/localStorage";
import FilterBar from "./FilterBar";
import AddArtworkModal from "./AddArtworkModal";
import ArtworkModal from "./ArtworkModal";
import { Button, Card, Row, Col } from "react-bootstrap";

const ArtworkList: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const savedArtworks = loadArtworks();
    return savedArtworks.length > 0 ? savedArtworks : mockArtworks;
  });
  // localStorage.clear();
  useEffect(() => {
    saveArtworks(artworks);
  }, [artworks]);

  const [sortOrder, setSortOrder] = useState<string>("");
  const [artistFilter, setArtistFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

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

  const handleUpdateArtwork = (updatedArtwork: Artwork) => {
    setArtworks((prevArtworks) =>
      prevArtworks.map((art) => (art.id === updatedArtwork.id ? updatedArtwork : art))
    );
    setSelectedArtwork(updatedArtwork);
  };
  
  const handleDeleteArtwork = (id: string) => {
    setArtworks((prevArtworks) => prevArtworks.filter((art) => art.id !== id));
    setSelectedArtwork(null);
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
    <div className="p-4 bg-light h-100">
      <h2 className="fs-2 fw-bold">Explore Our Collection</h2>

      <div className="d-flex flex-wrap justify-content-start align-items-center">
        <FilterBar onFilterChange={handleFilterChange} />

        <select className="p-2 rounded text-secondary text-start w-auto" onChange={handleSortChange} value={sortOrder}>
          <option value="">Sort by</option>
          <option value="asc">Price ↑</option>
          <option value="desc">Price ↓</option>
        </select>
      </div>

      <Row className="mt-3">
        {sortedArtworks.map((artwork) => (
          <Col key={artwork.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card onClick={() => setSelectedArtwork(artwork)} className="shadow-sm cursor-pointer p-3">
              <Card.Img
                className="rounded"
                variant="top"
                src="src/img/3.jpg" // Тимчасова заглушка для зображення
                alt={artwork.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="p-0 mt-3">
                <div className="d-flex justify-content-between">
                  {/* <Card.Title>{artwork.title}</Card.Title> */}
                  <span className="fw-bold fs-5 text-truncate">{artwork.title}</span>

                  <span className="fw-bold fs-5">${artwork.price}</span>
                </div>
                <div className="d-flex justify-content-between text-muted">
                  <span className="text-truncate">By: {artwork.artist}</span>
                  <span className="text-center">{artwork.availability ? "For Sale" : "Exhibition Only"}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <AddArtworkModal show={showAddModal} onHide={() => setShowAddModal(false)} onAddArtwork={handleAddArtwork} />

      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onHide={() => setSelectedArtwork(null)}
          onUpdate={handleUpdateArtwork}
          onDelete={handleDeleteArtwork}
        />
      )}

      <Button variant="dark" onClick={() => setShowAddModal(true)}>
        Add New Artwork
      </Button>
    </div>
  );
};

export default ArtworkList;