export default function ProgressBar({ current, target, className = "" }) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className={`progress-container ${className}`}>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <span className="progress-text">
        ${current.toLocaleString()} / ${target.toLocaleString()} (
        {percentage.toFixed(1)}%)
      </span>
    </div>
  );
}
