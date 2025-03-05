import React from "react";

type FilterBarProps = {
  onFilterChange: (artist: string, type: string) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  return (
    <div>
      {/* Пошук за художником (миттєве фільтрування) */}
      <input
        type="text"
        placeholder="Enter artist name..."
        onChange={(e) => onFilterChange(e.target.value, "")}
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
