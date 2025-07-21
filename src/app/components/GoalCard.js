import ProgressBar from "./ProgressBar";

export default function GoalCard({ goal, onEdit, onDelete }) {
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const deadline = new Date(goal.deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

  const getStatusBadge = () => {
    if (isCompleted) {
      return <span className="badge badge-success">🥇 Completed</span>;
    }
    if (daysLeft < 0) {
      return <span className="badge badge-danger">⚡ Overdue</span>;
    }
    if (daysLeft <= 30) {
      return <span className="badge badge-warning">⚠️ Deadline Soon</span>;
    }
    return <span className="badge badge-info">💹 Active</span>;
  };

  return (
    <div className="goal-card">
      <div className="goal-header">
        <h3 className="goal-name">{goal.name}</h3>
        {getStatusBadge()}
      </div>

      <p className="goal-description">{goal.description}</p>

      <ProgressBar
        current={goal.savedAmount}
        target={goal.targetAmount}
        className="goal-progress"
      />

      <div className="goal-details">
        <div className="goal-info">
          <span className="info-label">Deadline:</span>
          <span className="info-value">{deadline.toLocaleDateString()}</span>
        </div>
        <div className="goal-info">
          <span className="info-label">Days Left:</span>
          <span className="info-value">{daysLeft > 0 ? daysLeft : 0} days</span>
        </div>
      </div>

      <div className="goal-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(goal)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(goal.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
