import { Router } from "express";
import { getArtworks, getArtworkById, addArtwork, updateArtwork, deleteArtwork } from "../controllers/artworksController";

const router = Router();

router.get("/", getArtworks);
router.get("/:id", getArtworkById);
router.post("/", addArtwork);
router.put("/:id", updateArtwork); 
router.delete("/:id", deleteArtwork);

export default router;