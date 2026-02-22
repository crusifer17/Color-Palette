import './Toggle.css';

function Toggle({ isOn, onToggle, label }) {
  return (
    <div className="toggle-container">
      <span className="toggle-label">{label}</span>
      <button
        className={`toggle ${isOn ? 'toggle-on' : 'toggle-off'}`}
        onClick={onToggle}
        aria-label={`Toggle ${label}`}
        role="switch"
        aria-checked={isOn}
      >
        <span className="toggle-slider" />
      </button>
      <span className="toggle-status">{isOn ? 'ON' : 'OFF'}</span>
    </div>
  );
}

export default Toggle;
