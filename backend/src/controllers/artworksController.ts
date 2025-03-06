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
  if (!title || !artist || !type || !price) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO artworks (title, artist, type, price, availability) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, artist, type, price, availability || true]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

export const deleteArtwork = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM artworks WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};
