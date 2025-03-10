import React, { useState, useEffect, useRef } from "react";

type FilterBarProps = {
  onFilterChange: (artist: string, type: string, sortOrder: string) => void;
  artistFilter: string;
  typeFilter: string;
  sortOrder: string;
};

const FilterBar: React.FC<FilterBarProps> = ({  onFilterChange, artistFilter, typeFilter, sortOrder }) => {
  const [artistInput, setArtistInput] = useState(artistFilter);
  const [typeInput, setTypeInput] = useState(typeFilter);
  const [sortOrderInput, setSortOrderInput] = useState(sortOrder);

  const artistInputRef = useRef<HTMLInputElement | null>(null); // Збереження фокусу

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(artistInput, typeInput, sortOrderInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [artistInput, typeInput, sortOrderInput, onFilterChange]);

  useEffect(() => {
    if (artistInputRef.current) {
      artistInputRef.current.focus(); // Повертаємо фокус після оновлення
    }
  }, [artistInput]); // Викликаємо, тільки коли оновлюється artistInput

  return (
    <div className="d-flex flex-wrap gap-2">
      {/* Поле пошуку по художнику з debounce */}
      <input
        type="text"
        placeholder="Enter artist name..."
        value={artistInput}
        onChange={(e) => setArtistInput(e.target.value)}
        ref={artistInputRef} // Прив'язуємо поле введення
        className="p-2 rounded text-secondary text-start w-auto"
      />

      {/* Випадаючий список для фільтрування за типом */}
      <select
        value={typeInput}
        onChange={(e) => setTypeInput(e.target.value)}
        className="p-2 rounded text-secondary text-start w-auto"
      >
        <option value="">All types</option>
        <option value="painting">Painting</option>
        <option value="sculpture">Sculpture</option>
      </select>
      
      {/* Сортування по ціні */}
      <select
        value={sortOrderInput}
        onChange={(e) => setSortOrderInput(e.target.value)}
        className="p-2 rounded text-secondary text-start w-auto"
      >
        <option value="">Sort by</option>
        <option value="asc">Price ↑</option>
        <option value="desc">Price ↓</option>
      </select>
    </div>
  );
};

export default FilterBar;
