import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanValue = searchValue.trim().replace(/^#/, '');
    if (cleanValue && /^[0-9A-Fa-f]{1,6}$/.test(cleanValue)) {
      const paddedValue = cleanValue.padStart(6, '0');
      onSearch(`#${paddedValue}`);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch(null);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="search-hash">#</span>
        <input
          type="text"
          className="search-input"
          placeholder="000000 - ffffff"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          maxLength={7}
        />
        {searchValue && (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
