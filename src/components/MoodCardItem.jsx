import { useState } from 'react';
import './MoodCardItem.css';

function MoodCardItem({ card }) {
  const [copied, setCopied] = useState(false);
  const [hoveredColor, setHoveredColor] = useState(null);

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(card.colors.join(', '));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mood-card-item">
      <div className="mood-colors">
        {card.colors.map((color, index) => (
          <div
            key={index}
            className="mood-color-swatch"
            style={{ backgroundColor: color }}
            onMouseEnter={() => setHoveredColor(index)}
            onMouseLeave={() => setHoveredColor(null)}
          >
            {hoveredColor === index && (
              <div className="color-tooltip">
                {color.toUpperCase()}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mood-card-info">
        <h3 className="mood-card-name">{card.name}</h3>
        <div className="mood-card-tags">
          <span className="mood-tag emotion">{card.emotion}</span>
          <span className="mood-tag feel">{card.feel}</span>
        </div>
        <button
          className="copy-all-btn"
          onClick={handleCopyAll}
          title="Copy all colors"
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy All
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default MoodCardItem;
