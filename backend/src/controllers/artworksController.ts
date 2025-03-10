import { Request, Response } from "express";
import pool from "../config/db";

// розширює стандартний інтерфейс Request з Express (express.Request), додаючи file, яке містить завантажений файл.
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const getArtworks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rows } = await pool.query("SELECT * FROM artworks ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const getArtworkById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM artworks WHERE id = $1", [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Artwork not found" });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const addArtwork = async (req: MulterRequest, res: Response): Promise<void> => {
  const { title, artist, type, price, availability } = req.body;
  const imagepath  = req.file ? req.file.path.replace(/\\/g, "/") : null;

  if (!title || title.trim().length === 0 || title.length > 99) {
    res.status(400).json({ error: "Title is required and must be at most 99 characters long." });
    return;
  }
  if (!artist || artist.trim().length === 0 || artist.length > 50) {
    res.status(400).json({ error: "Artist name is required and must be at most 50 characters long." });
    return;
  }
  if (!type || typeof type !== "string") {
    res.status(400).json({ error: "Type is required and must be a string." });
    return;
  }
  const numericPrice = Number(price);
  if (!price || isNaN(numericPrice) || numericPrice <= 0) {
    res.status(400).json({ error: "Price must be a positive number." });
    return;
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO artworks (title, artist, type, price, availability, imagepath ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, artist, type, price, availability || true, imagepath ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const updateArtwork = async (req: MulterRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, artist, type, price, availability } = req.body;
  const imagepath = req.file ? req.file.path.replace(/\\/g, "/") : undefined;

  // console.log("Received Data:", { title, artist, type, price, availability, imagepath });

  if (!title || title.trim().length === 0 || title.length > 99) {
    res.status(400).json({ error: "Title is required and must be at most 99 characters long." });
    return;
  }
  if (!artist || artist.trim().length === 0 || artist.length > 50) {
    res.status(400).json({ error: "Artist name is required and must be at most 50 characters long." });
    return;
  }
  if (!type || typeof type !== "string") {
    res.status(400).json({ error: "Type is required and must be a string." });
    return;
  }
  const numericPrice = Number(price);
  if (!price || isNaN(numericPrice) || numericPrice <= 0) {
    res.status(400).json({ error: "Price must be a positive number." });
    return;
  }

  try {
    const updateFields = [
      "title = $1", "artist = $2", "type = $3", "price = $4", "availability = $5"
    ];
    const values = [title, artist, type, Number(price), availability];

    if (imagepath) {
      updateFields.push("imagepath = $6");
      values.push(imagepath);
    }

    values.push(id); // робимо щоб id завжди був останнім значенням

    // console.log("Executing SQL Query with values:", values);

    const query = `UPDATE artworks SET ${updateFields.join(", ")} WHERE id = $${values.length} RETURNING *`;
    
    // console.log("Executing SQL Query:", query);
    // console.log("With values:", values);
    
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      res.status(404).json({ error: "Artwork not found" });
      return;
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

export const deleteArtwork = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query("DELETE FROM artworks WHERE id = $1", [id]);
    if (rowCount === 0) {
      res.status(404).json({ error: "Artwork not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};