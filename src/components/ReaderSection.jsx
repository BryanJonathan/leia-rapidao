import PropTypes from 'prop-types';
import { WordDisplay } from './WordDisplay';
import { ProgressBar } from './ProgressBar';
import { Controls } from './Controls';

export function ReaderSection({ rsvp, onNewText }) {
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
        New Text
      </button>
    </div>
  );
}

ReaderSection.propTypes = {
  rsvp: PropTypes.shape({
    currentWord: PropTypes.string,
    currentIndex: PropTypes.number.isRequired,
    totalWords: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    progress: PropTypes.number.isRequired,
    isFinished: PropTypes.bool.isRequired,
    togglePlayPause: PropTypes.func.isRequired,
    rewind: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }).isRequired,
  onNewText: PropTypes.func.isRequired,
};
