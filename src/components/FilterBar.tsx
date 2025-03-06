import React, { useState, useEffect } from "react";

type FilterBarProps = {
  onFilterChange: (artist: string, type: string) => void;
  onSortChange: (sortOrder: string) => void; 
};

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onSortChange  }) => {
  const [artistInput, setArtistInput] = useState("");
  const [typeInput, setTypeInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(artistInput, typeInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [artistInput, typeInput, onFilterChange]);

  return (
    <div className="d-flex flex-wrap gap-2">
      {/* Поле пошуку по художнику з debounce */}
      <input
        type="text"
        placeholder="Enter artist name..."
        value={artistInput}
        onChange={(e) => setArtistInput(e.target.value)}
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
        onChange={(e) => onSortChange(e.target.value)}
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
