interface ProgressBarProps {
  progress: number;
  currentIndex: number;
  totalWords: number;
}

export function ProgressBar({ progress, currentIndex, totalWords }: ProgressBarProps) {
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
