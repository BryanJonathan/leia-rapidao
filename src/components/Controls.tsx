import { IoPlay, IoPause, IoStop, IoPlayBack } from 'react-icons/io5';
import { useSettings } from '../context/SettingsContext';

interface ControlsProps {
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  onRewind: () => void;
  onReset: () => void;
}

export function Controls({ isPlaying, onTogglePlayPause, onRewind, onReset }: ControlsProps) {
  const { t } = useSettings();

  return (
    <div className="controls">
      <button
        className="control-btn"
        onClick={onRewind}
        aria-label={t.rewind}
      >
        <IoPlayBack />
      </button>
      <button
        className="control-btn"
        onClick={onTogglePlayPause}
        aria-label={isPlaying ? t.pause : t.play}
      >
        {isPlaying ? <IoPause /> : <IoPlay />}
      </button>
      <button
        className="control-btn"
        onClick={onReset}
        aria-label={t.reset}
      >
        <IoStop />
      </button>
    </div>
  );
}
