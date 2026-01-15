import { RSVPHook } from '../hooks/useRSVP';
import { WordDisplay } from './WordDisplay';
import { ProgressBar } from './ProgressBar';
import { Controls } from './Controls';

interface ReaderSectionProps {
  rsvp: RSVPHook;
  onNewText: () => void;
}

export function ReaderSection({ rsvp, onNewText }: ReaderSectionProps) {
  const {
    currentWord,
    currentIndex,
    totalWords,
    isPlaying,
    progress,
    isFinished,
    togglePlayPause,
    rewind,
    reset,
  } = rsvp;

  return (
    <div className="reader-section">
      <WordDisplay
        currentWord={currentWord}
        isFinished={isFinished}
      />

      <ProgressBar
        progress={progress}
        currentIndex={currentIndex}
        totalWords={totalWords}
      />

      <Controls
        isPlaying={isPlaying}
        onTogglePlayPause={togglePlayPause}
        onRewind={() => rewind(5)}
        onReset={reset}
      />

      <button className="new-text-btn" onClick={onNewText}>
        Novo Texto
      </button>
    </div>
  );
}
