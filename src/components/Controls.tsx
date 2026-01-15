import { IoPlay, IoPause, IoStop, IoPlayBack } from 'react-icons/io5';

interface ControlsProps {
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  onRewind: () => void;
  onReset: () => void;
}

export function Controls({ isPlaying, onTogglePlayPause, onRewind, onReset }: ControlsProps) {
  return (
    <div className="controls">
      <button
        className="control-btn"
        onClick={onRewind}
        aria-label="Rewind 5 words"
      >
        <IoPlayBack />
      </button>
      <button
        className="control-btn"
        onClick={onTogglePlayPause}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <IoPause /> : <IoPlay />}
      </button>
      <button
        className="control-btn"
        onClick={onReset}
        aria-label="Reset"
      >
        <IoStop />
      </button>
    </div>
  );
}
