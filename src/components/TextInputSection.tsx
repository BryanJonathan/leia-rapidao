import { ChangeEvent } from 'react';
import { useSettings } from '../context/SettingsContext';

interface TextInputSectionProps {
  inputText: string;
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onStart: () => void;
}

export function TextInputSection({ inputText, onInputChange, onStart }: TextInputSectionProps) {
  const { t } = useSettings();
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const isDisabled = !inputText.trim();

  return (
    <div className="input-section">
      <h1 className="title">{t.title}</h1>
      <p className="subtitle">{t.subtitle}</p>

      <textarea
        className="text-input"
        value={inputText}
        onChange={onInputChange}
        placeholder={t.placeholder}
        rows={8}
        aria-label={t.textInputAriaLabel}
      />

      <div className="word-count">
        {wordCount} {wordCount === 1 ? t.wordSingular : t.wordPlural}
      </div>

      <button
        className="start-button"
        onClick={onStart}
        disabled={isDisabled}
      >
        {t.startReading}
      </button>
    </div>
  );
}
