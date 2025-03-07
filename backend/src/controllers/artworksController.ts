import { Request, Response } from "express";
import pool from "../config/db";

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

export const addArtwork = async (req: Request, res: Response): Promise<void> => {
  const { title, artist, type, price, availability } = req.body;

  if (!title || title.trim().length === 0 || title.length > 99) {
    res.status(400).json({ error: "Title is required (max 99 characters)." });
    return;
  }
  if (!artist || artist.trim().length === 0) {
    res.status(400).json({ error: "Artist name is required." });
    return;
  }
  if (!type) {
    res.status(400).json({ error: "Type is required." });
    return;
  }
  if (!price || isNaN(Number(price)) || Number(price) <= 0) {
    res.status(400).json({ error: "Price must be a positive number." });
    return;
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO artworks (title, artist, type, price, availability) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, artist, type, price, availability ?? true]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const updateArtwork = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, artist, type, price, availability } = req.body;

  if (!title || title.trim().length === 0 || title.length > 99) {
    res.status(400).json({ error: "Title is required (max 99 characters)." });
    return;
  }
  if (!artist || artist.trim().length === 0) {
    res.status(400).json({ error: "Artist name is required." });
    return;
  }
  if (!type) {
    res.status(400).json({ error: "Type is required." });
    return;
  }
  if (!price || isNaN(Number(price)) || Number(price) <= 0) {
    res.status(400).json({ error: "Price must be a positive number." });
    return;
  }

  try {
    const { rows } = await pool.query(
      "UPDATE artworks SET title = $1, artist = $2, type = $3, price = $4, availability = $5 WHERE id = $6 RETURNING *",
      [title, artist, type, price, availability, id]
    );

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