import { useState, useRef, useEffect } from 'react';
import './MultiSelectDropdown.css';

function MultiSelectDropdown({ options, selectedValues, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="multi-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedValues.length === 0
            ? `Select ${label}`
            : `${selectedValues.length} ${label} selected`}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="multi-select-dropdown-menu">
          <div className="dropdown-header">
            <span className="dropdown-title">Select {label}</span>
            {selectedValues.length > 0 && (
              <button
                type="button"
                className="clear-all-btn"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            )}
          </div>
          <div className="dropdown-search">
            <input
              type="text"
              placeholder={`Search ${label.toLowerCase()}...`}
              className="search-input"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                const items = dropdownRef.current.querySelectorAll('.dropdown-item');
                items.forEach(item => {
                  const text = item.textContent.toLowerCase();
                  item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
                });
              }}
            />
          </div>
          <div className="dropdown-options">
            {options.map(option => (
              <label key={option} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => handleToggle(option)}
                />
                <span className="checkbox-custom"></span>
                <span className="option-label">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
