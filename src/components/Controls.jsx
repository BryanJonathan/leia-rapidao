import PropTypes from 'prop-types';
import { IoPlay, IoPause, IoStop, IoPlayBack } from 'react-icons/io5';

export function Controls({ isPlaying, onTogglePlayPause, onRewind, onReset }) {
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

Controls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onTogglePlayPause: PropTypes.func.isRequired,
  onRewind: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};
