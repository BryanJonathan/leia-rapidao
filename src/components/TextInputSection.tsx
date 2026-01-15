import { ChangeEvent } from 'react';

interface TextInputSectionProps {
  inputText: string;
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onStart: () => void;
}

export function TextInputSection({ inputText, onInputChange, onStart }: TextInputSectionProps) {
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const isDisabled = !inputText.trim();

  return (
    <div className="input-section">
      <h1 className="title">Leitura Rápida</h1>
      <p className="subtitle">Cole seu texto e leia mais rápido</p>

      <textarea
        className="text-input"
        value={inputText}
        onChange={onInputChange}
        placeholder="Cole seu texto aqui..."
        rows={8}
        aria-label="Campo de texto para leitura"
      />

      <div className="word-count">
        {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'}
      </div>

      <button
        className="start-button"
        onClick={onStart}
        disabled={isDisabled}
      >
        Iniciar Leitura
      </button>
    </div>
  );
}
