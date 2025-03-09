export type Artwork = {
  id: string;
  title: string;
  artist: string;
  type: string;
  price: number;
  availability: boolean;
  imagepath?: string; // "?"-необов’язкове поле, Якщо бекенд повертає null або запис був доданий без фото, то imagePath просто не буде у об’єкті.
};