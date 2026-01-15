import PropTypes from 'prop-types';

export function ProgressBar({ progress, currentIndex, totalWords }) {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="progress-text">
        {currentIndex + 1} / {totalWords}
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  totalWords: PropTypes.number.isRequired,
};
