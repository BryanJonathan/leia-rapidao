import { ChangeEvent } from 'react';
import { IoClose, IoSettings } from 'react-icons/io5';
import { useSettings } from '../context/SettingsContext';
import { Language } from '../utils/i18n';
import '../styles/SettingsPanel.css';

interface SettingsToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SettingsToggle({ isOpen, onToggle }: SettingsToggleProps) {
  const { t } = useSettings();

  return (
    <button
      className="settings-toggle"
      onClick={onToggle}
      aria-label={isOpen ? t.closeSettings : t.openSettings}
    >
      {isOpen ? <IoClose /> : <IoSettings />}
    </button>
  );
}

interface SettingsPanelProps {
  speedInput: string;
  onSpeedInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSpeedInputBlur: () => void;
}

export function SettingsPanel({ speedInput, onSpeedInputChange, onSpeedInputBlur }: SettingsPanelProps) {
  const { settings, updateSettings, t } = useSettings();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ language: e.target.value as Language });
  };

  return (
    <div className="settings-panel">
      <h3>{t.settings}</h3>

      <div className="setting-item">
        <label htmlFor="language-select">{t.language}</label>
        <select
          id="language-select"
          value={settings.language}
          onChange={handleLanguageChange}
        >
          <option value="pt">Português</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="setting-item">
        <label htmlFor="speed-input">{t.speed}</label>
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
        <label htmlFor="text-color">{t.textColor}</label>
        <input
          id="text-color"
          type="color"
          value={settings.textColor}
          onChange={(e) => updateSettings({ textColor: e.target.value })}
        />
      </div>

      <div className="setting-item">
        <label htmlFor="highlight-color">{t.highlightColor}</label>
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
