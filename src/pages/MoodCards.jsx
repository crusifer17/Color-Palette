import { useState, useMemo } from 'react';
import { moodCards, emotions, feels } from '../data/moodCards';
import MoodCardGrid from '../components/MoodCardGrid';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import './MoodCards.css';

function MoodCards() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState('All');
  const [selectedFeel, setSelectedFeel] = useState('All');
  const [selectedNames, setSelectedNames] = useState([]);

  const CARDS_PER_PAGE = 20; // 10x2 grid

  // Get all card names sorted alphabetically
  const cardNames = useMemo(() => {
    return [...moodCards].sort((a, b) => a.name.localeCompare(b.name)).map(card => card.name);
  }, []);

  const filteredCards = useMemo(() => {
    return moodCards
      .filter(card => {
        const emotionMatch = selectedEmotion === 'All' || card.emotion === selectedEmotion;
        const feelMatch = selectedFeel === 'All' || card.feel === selectedFeel;
        const nameMatch = selectedNames.length === 0 || selectedNames.includes(card.name);
        return emotionMatch && feelMatch && nameMatch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [selectedEmotion, selectedFeel, selectedNames]);

  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
  const displayedCards = filteredCards.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  );

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = () => {
    setCurrentPage(0);
  };

  const handleNameChange = (selected) => {
    setSelectedNames(selected);
    if (selected.length > 0) {
      // If specific cards are selected, reset other filters
      setSelectedEmotion('All');
      setSelectedFeel('All');
    }
    handleFilterChange();
  };

  return (
    <div className="mood-cards-page">
      <div className="mood-header">
        <h1>Mood Cards</h1>
        <p className="mood-subtitle">
          Curated color palettes for every emotion and feel
        </p>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="name-filter">Card Names:</label>
            <MultiSelectDropdown
              options={cardNames}
              selectedValues={selectedNames}
              onChange={handleNameChange}
              label="Cards"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="emotion-filter">Emotion:</label>
            <select
              id="emotion-filter"
              value={selectedEmotion}
              onChange={(e) => {
                setSelectedEmotion(e.target.value);
                setSelectedNames([]);
                handleFilterChange();
              }}
            >
              <option value="All">All Emotions</option>
              {emotions.map(emotion => (
                <option key={emotion} value={emotion}>{emotion}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="feel-filter">Feel:</label>
            <select
              id="feel-filter"
              value={selectedFeel}
              onChange={(e) => {
                setSelectedFeel(e.target.value);
                setSelectedNames([]);
                handleFilterChange();
              }}
            >
              <option value="All">All Feels</option>
              {feels.map(feel => (
                <option key={feel} value={feel}>{feel}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="results-info">
          Showing {displayedCards.length} of {filteredCards.length} mood cards
        </div>
      </div>

      <div className="mood-main">
        <MoodCardGrid cards={displayedCards} />

        <div className="pagination">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 0}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages - 1}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoodCards;
