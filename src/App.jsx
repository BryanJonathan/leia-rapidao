import { useState, useEffect, useCallback } from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { useRSVP } from './hooks/useRSVP';
import { SettingsToggle, SettingsPanel, TextInputSection, ReaderSection } from './components';
import { DEFAULT_TEXT } from './utils/const';
import './App.css';

function CentralReader() {
  const { settings, updateSettings } = useSettings();
  const [showSettings, setShowSettings] = useState(false);
  const [inputText, setInputText] = useState(DEFAULT_TEXT);
  const [speedInput, setSpeedInput] = useState(String(settings.speed));
  const rsvp = useRSVP();

  // Handlers
  const handleStart = useCallback(() => {
    if (inputText.trim()) {
      rsvp.setText(inputText.trim());
      rsvp.play();
    }
  }, [inputText, rsvp]);

  const handleNewText = useCallback(() => {
    rsvp.setText('');
    setInputText('');
  }, [rsvp]);

  const handleSpeedInputChange = useCallback((e) => {
    rsvp.pause();
    setSpeedInput(e.target.value);
  }, [rsvp]);

  const handleSpeedInputBlur = useCallback(() => {
    const value = parseInt(speedInput);
    if (!value || value < 1) {
      setSpeedInput('1');
      updateSettings({ speed: 1 });
    } else if (value > 1000) {
      setSpeedInput('1000');
      updateSettings({ speed: 1000 });
    } else {
      updateSettings({ speed: value });
    }
  }, [speedInput, updateSettings]);

  const handleInputChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  const toggleSettingsPanel = useCallback(() => {
    setShowSettings((prev) => !prev);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore shortcuts when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          rsvp.togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          rsvp.rewind(5);
          break;
        case 'ArrowRight':
          e.preventDefault();
          rsvp.forward(5);
          break;
        case 'KeyR':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            rsvp.reset();
          }
          break;
        case 'Escape':
          setShowSettings(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rsvp]);

  return (
    <div className="app-container">
      <SettingsToggle isOpen={showSettings} onToggle={toggleSettingsPanel} />

      {showSettings && (
        <SettingsPanel
          speedInput={speedInput}
          onSpeedInputChange={handleSpeedInputChange}
          onSpeedInputBlur={handleSpeedInputBlur}
        />
      )}

      <div className="central-content">
        {!rsvp.hasText ? (
          <TextInputSection
            inputText={inputText}
            onInputChange={handleInputChange}
            onStart={handleStart}
          />
        ) : (
          <ReaderSection rsvp={rsvp} onNewText={handleNewText} />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <CentralReader />
    </SettingsProvider>
  );
}

export default App;
