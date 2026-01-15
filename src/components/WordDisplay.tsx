import { useSettings } from '../context/SettingsContext';
import { splitWordByORP } from '../utils/orp';
import { FocusFrame } from './FocusFrame';

interface WordDisplayProps {
  currentWord?: string;
  isFinished: boolean;
}

export function WordDisplay({ currentWord = '', isFinished }: WordDisplayProps) {
  const { settings, t } = useSettings();
  const { before, orp, after } = splitWordByORP(currentWord);

  return (
    <div className="word-display">
      <FocusFrame />

      {isFinished ? (
        <span className="finished-text">{t.finished}</span>
      ) : (
        <span className="word" style={{ color: settings.textColor }}>
          <span className="before">{before}</span>
          <span className="orp" style={{ color: settings.highlightColor }}>{orp}</span>
          <span className="after">{after}</span>
        </span>
      )}
    </div>
  );
}
