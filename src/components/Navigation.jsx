import { useState } from 'react';
import './Navigation.css';

function Navigation({ currentPage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <>
      <button className="hamburger-btn" onClick={toggleMenu} aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {isOpen && <div className="menu-overlay" onClick={() => setIsOpen(false)} />}

      <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="menu-title">Navigation</h2>

        <ul className="menu-list">
          <li>
            <button
              className={`menu-item ${currentPage === 'colors' ? 'active' : ''}`}
              onClick={() => handleNavigate('colors')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Color Explorer
            </button>
          </li>
          <li>
            <button
              className={`menu-item ${currentPage === 'moods' ? 'active' : ''}`}
              onClick={() => handleNavigate('moods')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Mood Cards
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
