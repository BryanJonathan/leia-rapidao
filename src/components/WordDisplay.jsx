import PropTypes from 'prop-types';
import { useSettings } from '../context/SettingsContext';
import { splitWordByORP } from '../utils/orp';
import { FocusFrame } from './FocusFrame';

export function WordDisplay({ currentWord, isFinished }) {
  const { settings } = useSettings();
  const { before, orp, after } = splitWordByORP(currentWord || '');

  return (
    <div className="word-display">
      <FocusFrame />

      {isFinished ? (
        <span className="finished-text">Done!</span>
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

WordDisplay.propTypes = {
  currentWord: PropTypes.string,
  isFinished: PropTypes.bool.isRequired,
};

WordDisplay.defaultProps = {
  currentWord: '',
};
