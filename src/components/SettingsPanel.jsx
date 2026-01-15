import { IoClose, IoSettings } from 'react-icons/io5';
import { useSettings } from '../context/SettingsContext';
import PropTypes from 'prop-types';

export function SettingsToggle({ isOpen, onToggle }) {
  return (
    <button
      className="settings-toggle"
      onClick={onToggle}
      aria-label={isOpen ? 'Close settings' : 'Open settings'}
    >
      {isOpen ? <IoClose /> : <IoSettings />}
    </button>
  );
}

SettingsToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export function SettingsPanel({ speedInput, onSpeedInputChange, onSpeedInputBlur }) {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="settings-panel">
      <h3>Settings</h3>

      <div className="setting-item">
        <label htmlFor="speed-input">Speed (ms)</label>
        <input
          id="speed-input"
          type="number"
          value={speedInput}
          onChange={onSpeedInputChange}
          onBlur={onSpeedInputBlur}
          min={1}
          max={1000}
          step={10}
        />
      </div>

      <div className="setting-item">
        <label htmlFor="text-color">Text Color</label>
        <input
          id="text-color"
          type="color"
          value={settings.textColor}
          onChange={(e) => updateSettings({ textColor: e.target.value })}
        />
      </div>

      <div className="setting-item">
        <label htmlFor="highlight-color">Highlight Color</label>
        <input
          id="highlight-color"
          type="color"
          value={settings.highlightColor}
          onChange={(e) => updateSettings({ highlightColor: e.target.value })}
        />
      </div>
    </div>
  );
}

SettingsPanel.propTypes = {
  speedInput: PropTypes.string.isRequired,
  onSpeedInputChange: PropTypes.func.isRequired,
  onSpeedInputBlur: PropTypes.func.isRequired,
};
