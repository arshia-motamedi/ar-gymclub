import React from 'react';
import './Filter.css';

export default function Filter({ onFilterChange }) {
  return (
    <div className="filter-dropdown">
      <label htmlFor="productFilter" className="filter-label">Filter Products:</label>
      <select
        id="productFilter"
        className="filter-select"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">All Products</option>
        <option value="pre">Pre</option>
        <option value="whey">whey</option>
        <option value="amino">amino</option>
      </select>
    </div>
  );
}
