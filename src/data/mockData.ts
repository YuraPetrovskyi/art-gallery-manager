import { Artwork } from "../types/artwork";

export const mockArtworks: Artwork[] = [
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