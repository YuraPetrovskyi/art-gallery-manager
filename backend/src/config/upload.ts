import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

// Налаштування сховища файлів
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Папка для збереження файлів
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Унікальна назва файлу
  },
});

// Фільтр для перевірки типу файлу (тільки зображення)
const fileFilter: multer.Options["fileFilter"] = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Обмеження на розмір файлу (5MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
