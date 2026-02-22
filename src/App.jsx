import { useState, useMemo, useCallback } from 'react';
import ColorGrid from './components/ColorGrid';
import Toggle from './components/Toggle';
import SearchBar from './components/SearchBar';
import Navigation from './components/Navigation';
import MoodCards from './pages/MoodCards';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('colors');
  const [isPaginated, setIsPaginated] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchColor, setSearchColor] = useState(null);

  const COLORS_PER_PAGE = 100; // 25x4 grid
  const TOTAL_COLORS = 0xffffff + 1; // 16,777,216 colors
  const totalPages = Math.ceil(TOTAL_COLORS / COLORS_PER_PAGE);

  // Generate colors on-demand
  const generateColors = useCallback((start, count) => {
    const colors = [];
    const end = Math.min(start + count, TOTAL_COLORS);
    for (let i = start; i < end; i++) {
      colors.push(`#${i.toString(16).padStart(6, '0')}`);
    }
    return colors;
  }, [TOTAL_COLORS]);

  const displayedColors = useMemo(() => {
    if (searchColor) {
      return [searchColor];
    }
    if (isPaginated) {
      const start = currentPage * COLORS_PER_PAGE;
      return generateColors(start, COLORS_PER_PAGE);
    }
    // For non-paginated, start with empty array (ColorGrid will handle lazy loading)
    return [];
  }, [isPaginated, currentPage, generateColors, searchColor]);

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleToggle = () => {
    setIsPaginated(prev => !prev);
    setCurrentPage(0);
  };

  const handleSearch = (color) => {
    setSearchColor(color);
    if (color) {
      setCurrentPage(0);
    }
  };

  if (currentView === 'moods') {
    return (
      <div className="app">
        <Navigation currentPage={currentView} onNavigate={setCurrentView} />
        <MoodCards />
      </div>
    );
  }

  return (
    <div className="app">
      <Navigation currentPage={currentView} onNavigate={setCurrentView} />
      <header className="app-header">
        <h1>Color Palette Explorer</h1>
        <p className="subtitle">
          Explore all {TOTAL_COLORS.toLocaleString()} colors from #000000 to #ffffff
        </p>
        <div className="controls">
          <SearchBar onSearch={handleSearch} />
          <Toggle
            isOn={isPaginated}
            onToggle={handleToggle}
            label="Pagination"
          />
        </div>
      </header>

      <main className="app-main">
        {searchColor && (
          <div className="search-result-info">
            Showing result for: <strong>{searchColor.toUpperCase()}</strong>
          </div>
        )}
        
        <ColorGrid 
          colors={displayedColors} 
          isPaginated={isPaginated || searchColor !== null}
          generateColors={generateColors}
          totalColors={TOTAL_COLORS}
        />

        {isPaginated && !searchColor && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 0}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage + 1} of {totalPages.toLocaleString()}
            </span>
            <button
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages - 1}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
