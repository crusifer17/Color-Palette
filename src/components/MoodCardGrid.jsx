import MoodCardItem from './MoodCardItem';
import './MoodCardGrid.css';

function MoodCardGrid({ cards }) {
  return (
    <div className="mood-card-grid">
      {cards.map(card => (
        <MoodCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}

export default MoodCardGrid;
