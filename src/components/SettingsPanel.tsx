import { ChangeEvent } from 'react';
import { IoClose, IoSettings } from 'react-icons/io5';
import { useSettings } from '../context/SettingsContext';

interface SettingsToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SettingsToggle({ isOpen, onToggle }: SettingsToggleProps) {
  return (
    <button
      className="settings-toggle"
      onClick={onToggle}
      aria-label={isOpen ? 'Fechar configurações' : 'Abrir configurações'}
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
  const { settings, updateSettings } = useSettings();

  return (
    <div className="settings-panel">
      <h3>Configurações</h3>

      <div className="setting-item">
        <label htmlFor="speed-input">Velocidade (ms)</label>
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
        <label htmlFor="text-color">Cor do Texto</label>
        <input
          id="text-color"
          type="color"
          value={settings.textColor}
          onChange={(e) => updateSettings({ textColor: e.target.value })}
        />
      </div>

      <div className="setting-item">
        <label htmlFor="highlight-color">Cor do Destaque</label>
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
