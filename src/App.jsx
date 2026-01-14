import { useState, useEffect } from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { useRSVP } from './hooks/useRSVP';
import { splitWordByORP } from './utils/orp';
import { IoPlay, IoPause, IoStop, IoPlayBack, IoSettings, IoClose } from 'react-icons/io5';
import './App.css';

const DEFAULT_TEXT = `A aplicação tem como objetivo transformar a forma como as pessoas consomem textos longos no ambiente digital, tornando a leitura mais rápida, fluida e menos cansativa. Em vez de apresentar o texto no formato tradicional, com linhas e parágrafos que exigem constantes movimentos dos olhos, o sistema utiliza uma abordagem focada no processamento natural do cérebro humano.

Para isso, a aplicação combina a técnica de Rapid Serial Visual Presentation (RSVP), que exibe uma palavra por vez sempre na mesma posição da tela. Dessa forma, o leitor não precisa mover os olhos para acompanhar o texto, reduzindo o esforço visual e permitindo que a atenção fique totalmente focada no conteúdo apresentado. A leitura passa a acontecer como um fluxo contínuo, controlado por uma velocidade ajustável de acordo com a preferência do usuário.

Além disso, cada palavra é exibida com destaque em seu Optimal Recognition Point (ORP), que é o ponto ideal onde o cérebro reconhece a palavra mais rapidamente. Esse ponto varia conforme o tamanho da palavra e permanece sempre alinhado na interface. Com isso, o reconhecimento das palavras se torna mais eficiente, aumentando a velocidade de leitura sem comprometer a compreensão.

A aplicação também considera o ritmo natural da linguagem, aplicando pausas automáticas em sinais de pontuação e quebras de parágrafo. Essas pausas ajudam o cérebro a processar a informação, mantendo a clareza do texto mesmo em velocidades mais altas. O usuário pode pausar, retomar ou voltar algumas palavras sempre que necessário, garantindo controle total sobre a experiência.

No final, o sistema se propõe a ser uma ferramenta prática e acessível para leitura de artigos, estudos e conteúdos diversos, unindo princípios científicos de cognição e design de interface. O foco não é apenas ler mais rápido, mas ler melhor, com menos fadiga e maior aproveitamento do conteúdo.`;

function CentralReader() {
  const { settings, updateSettings } = useSettings();
  const [showSettings, setShowSettings] = useState(false);
  const [inputText, setInputText] = useState(DEFAULT_TEXT);
  const [speedInput, setSpeedInput] = useState(String(settings.speed));
  const rsvp = useRSVP();

  const handleStart = () => {
    if (inputText.trim()) {
      rsvp.setText(inputText.trim());
      rsvp.play();
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

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

  const { before, orp, after } = splitWordByORP(rsvp.currentWord || '');

  return (
    <div className="app-container">
      {/* Settings Toggle */}
      <button
        className="settings-toggle"
        onClick={() => setShowSettings(!showSettings)}
      >
        {showSettings ? <IoClose /> : <IoSettings />}
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="settings-panel">
          <h3>Settings</h3>

          <div className="setting-item">
            <label>Speed (ms)</label>
            <input
              type="number"
              value={speedInput}
              onChange={(e) => {
                rsvp.pause();
                setSpeedInput(e.target.value);
              }}
              onBlur={() => {
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
              }}
              min={1}
              max={1000}
              step={10}
            />
          </div>

          <div className="setting-item">
            <label>Text Color</label>
            <input
              type="color"
              value={settings.textColor}
              onChange={(e) => updateSettings({ textColor: e.target.value })}
            />
          </div>

          <div className="setting-item">
            <label>Highlight Color</label>
            <input
              type="color"
              value={settings.highlightColor}
              onChange={(e) => updateSettings({ highlightColor: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="central-content">
        {!rsvp.hasText ? (
          // Input View
          <div className="input-section">
            <h1 className="title">RSVP Reader</h1>
            <p className="subtitle">Paste your text and read faster</p>

            <textarea
              className="text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here..."
              rows={8}
            />

            <div className="word-count">
              {inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words
            </div>

            <button
              className="start-button"
              onClick={handleStart}
              disabled={!inputText.trim()}
            >
              Start Reading
            </button>
          </div>
        ) : (
          // Reader View
          <div className="reader-section">
            {/* Word Display */}
            <div className="word-display">
              {/* Focus Frame */}
              <div className="focus-frame">
                <div className="focus-line focus-line-top-left"></div>
                <div className="focus-line focus-line-top-right"></div>
                <div className="focus-line focus-line-bottom-left"></div>
                <div className="focus-line focus-line-bottom-right"></div>
              </div>

              {rsvp.isFinished ? (
                <span className="finished-text">Done!</span>
              ) : (
                <span className="word" style={{ color: settings.textColor }}>
                  <span className="before">{before}</span>
                  <span className="orp" style={{ color: settings.highlightColor }}>{orp}</span>
                  <span className="after">{after}</span>
                </span>
              )}
            </div>

            {/* Progress */}
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${rsvp.progress}%` }}
                />
              </div>
              <div className="progress-text">
                {rsvp.currentIndex + 1} / {rsvp.totalWords}
              </div>
            </div>

            {/* Controls */}
            <div className="controls">
              <button className="control-btn" onClick={() => rsvp.rewind(5)}>
                <IoPlayBack />
              </button>
              <button
                className="control-btn"
                onClick={rsvp.togglePlayPause}
              >
                {rsvp.isPlaying ? <IoPause /> : <IoPlay />}
              </button>
              <button className="control-btn" onClick={rsvp.reset}>
                <IoStop />
              </button>
            </div>

            {/* New Text Button */}
            <button
              className="new-text-btn"
              onClick={() => {
                rsvp.setText('');
                setInputText('');
              }}
            >
              New Text
            </button>
          </div>
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
