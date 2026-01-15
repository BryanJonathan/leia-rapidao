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
      <h1 className="title">RSVP Reader</h1>
      <p className="subtitle">Paste your text and read faster</p>

      <textarea
        className="text-input"
        value={inputText}
        onChange={onInputChange}
        placeholder="Paste your text here..."
        rows={8}
        aria-label="Text input for reading"
      />

      <div className="word-count">
        {wordCount} {wordCount === 1 ? 'word' : 'words'}
      </div>

      <button
        className="start-button"
        onClick={onStart}
        disabled={isDisabled}
      >
        Start Reading
      </button>
    </div>
  );
}
