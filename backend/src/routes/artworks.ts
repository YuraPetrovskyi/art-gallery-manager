import { Router } from "express";
import upload from "../config/upload";
import { getArtworks, getArtworkById, addArtwork, updateArtwork, deleteArtwork } from "../controllers/artworksController";

const router = Router();

router.get("/", getArtworks);
router.get("/:id", getArtworkById);
// Додаємо multer middleware `upload.single("image")` для обробки файлу
router.post("/", upload.single("image"), addArtwork);
router.put("/:id", upload.single("image"), updateArtwork);
router.delete("/:id", deleteArtwork);

export default router;