import React, { useState, useEffect } from "react";
import axios from "axios";
import { Artwork } from "../types/artwork";
import FilterBar from "./FilterBar";
import AddArtworkModal from "./AddArtworkModal";
import ArtworkModal from "./ArtworkModal";
import { Button, Card, Row, Col, Spinner } from "react-bootstrap";

const API_URL = "http://localhost:8000/api/artworks";

const ArtworkList: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const [artistFilter, setArtistFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (artistFilter) params.append("artist", artistFilter);
      if (typeFilter) params.append("type", typeFilter);
      if (sortOrder) params.append("price", sortOrder);

      console.log("Fetching artworks with:", params.toString());

      const response = await axios.get(`${API_URL}?${params.toString()}`);
      setArtworks(response.data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setError("Failed to load artworks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [artistFilter, typeFilter, sortOrder]);

  const handleFilterChange = (artist: string, type: string, sortOrder: string) => {
    setArtistFilter(artist);
    setTypeFilter(type);
    setSortOrder(sortOrder);
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

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <p className="text-danger text-center pt-5">{error}</p>;

  return (
    <div className="p-4 bg-light h-100">
      <h2 className="fs-2 fw-bold">Explore Our Collection</h2>

      <FilterBar 
        onFilterChange={handleFilterChange}
        artistFilter={artistFilter} 
        typeFilter={typeFilter} 
        sortOrder={sortOrder}
      />

      <Row className="mt-3">
        {artworks.map((artwork) => (
          <Col key={artwork.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card
              onClick={() => setSelectedArtwork(artwork)}
              className="shadow-sm cursor-pointer p-3 h-100 d-flex flex-column"
            >
              <Card.Img
                className="rounded"
                variant="top"
                src={artwork.imagepath ? `http://localhost:8000/${artwork.imagepath}` : "http://localhost:8000/uploads/default.jpg"}
                alt={artwork.title}
                onError={(e) => (e.currentTarget.src = "http://localhost:8000/uploads/default.jpg")}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="p-0 mt-3 d-flex flex-column flex-grow-1">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold fs-5 text-truncate">{artwork.title}</span>
                  <span className="fw-bold fs-5">${Math.floor(artwork.price)}</span>
                </div>
                <div className="d-flex justify-content-between text-muted" style={{ fontSize: "0.7rem" }}>
                  <span className="text-truncate">By: {artwork.artist}</span>
                  <span className="text-end text-truncate">{artwork.availability ? "For Sale" : "Exhibition Only"}</span>
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