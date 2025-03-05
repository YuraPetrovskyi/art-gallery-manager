import React, { useState, useEffect } from "react";

type FilterBarProps = {
  onFilterChange: (artist: string, type: string) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [artistInput, setArtistInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(artistInput, "");
    }, 300); // 300 мс затримки

    return () => clearTimeout(timer);
  }, [artistInput, onFilterChange]);

  return (
    <div>
      {/* Поле пошуку по художнику з debounce */}
      <input
        type="text"
        placeholder="Enter artist name..."
        value={artistInput}
        onChange={(e) => setArtistInput(e.target.value)}
      />

      {/* Випадаючий список для фільтрування за типом */}
      <select onChange={(e) => onFilterChange("", e.target.value)}>
        <option value="">All types</option>
        <option value="painting">Painting</option>
        <option value="sculpture">Sculpture</option>
      </select>
    </div>
  );
};

export default FilterBar;
