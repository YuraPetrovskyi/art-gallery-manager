import { Artwork } from "../types/artwork";

const STORAGE_KEY = "art_gallery_artworks";

export const loadArtworks = (): Artwork[] => {
  const savedArtworks = localStorage.getItem(STORAGE_KEY);
  return savedArtworks ? JSON.parse(savedArtworks) : [];
};

export const saveArtworks = (artworks: Artwork[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(artworks));
};