import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import artworksRoutes from "./routes/artworks";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/artworks", artworksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});