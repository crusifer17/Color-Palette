import { useRef, useCallback, useState, useEffect } from 'react';
import ColorCard from './ColorCard';
import './ColorGrid.css';

function ColorGrid({ colors, isPaginated, generateColors, totalColors }) {
  const observer = useRef();
  const [visibleColors, setVisibleColors] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const BATCH_SIZE = 100;

  useEffect(() => {
    if (isPaginated) {
      setVisibleColors(colors);
    } else {
      // Start fresh with first batch for non-paginated mode
      const firstBatch = generateColors(0, BATCH_SIZE);
      setVisibleColors(firstBatch);
      setLoadedCount(BATCH_SIZE);
    }
  }, [isPaginated, colors, generateColors]);

  const lastColorRef = useCallback(
    (node) => {
      if (isPaginated) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loadedCount < totalColors) {
          const nextBatch = generateColors(loadedCount, BATCH_SIZE);
          setVisibleColors((prev) => [...prev, ...nextBatch]);
          setLoadedCount((prev) => prev + BATCH_SIZE);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isPaginated, loadedCount, totalColors, generateColors]
  );

  return (
    <div className="color-grid">
      {visibleColors.map((color, index) => {
        const isLast = index === visibleColors.length - 1;
        return (
          <ColorCard
            key={color}
            color={color}
            ref={isLast && !isPaginated ? lastColorRef : null}
          />
        );
      })}
    </div>
  );
}

export default ColorGrid;
