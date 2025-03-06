import express from "express";
import { getArtworks, getArtworkById, addArtwork, deleteArtwork } from "../controllers/artworksController";

const router = express.Router();

router.get("/", getArtworks);
router.get("/:id", getArtworkById);
router.post("/", addArtwork);
router.delete("/:id", deleteArtwork);

export default router;