import {
  FaBullseye,
  FaCheckCircle,
  FaMoneyBillWave,
  FaMedal,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import StatCard from "./StatCard";

export default function Overview({ goals }) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter(
    (goal) => goal.savedAmount >= goal.targetAmount
  ).length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  // Calculate warnings
  const today = new Date();
  const overdueGoals = goals.filter((goal) => {
    const deadline = new Date(goal.deadline);
    return deadline < today && goal.savedAmount < goal.targetAmount;
  }).length;

  const soonDeadlines = goals.filter((goal) => {
    const deadline = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return (
      daysLeft <= 30 && daysLeft > 0 && goal.savedAmount < goal.targetAmount
    );
  }).length;

  return (
    <div className="overview">
      <h2 className="overview-title">
        {" "}
        <FaBullseye /> Goals Overview
      </h2>

      <div className="stats-grid">
        <StatCard
          title="Total Goals"
          value={totalGoals}
          icon={<FaBullseye />}
          color="purple"
        />

        <StatCard
          title="Completed"
          value={`${completedGoals} / ${totalGoals}`}
          icon={<FaCheckCircle />}
          color="blue"
        />

        <StatCard
          title="Total Saved"
          value={`Ksh ${totalSaved.toLocaleString()}`}
          icon={<FaMoneyBillWave />}
          color="green"
        />

        <StatCard
          title="Total Target"
          value={`Ksh ${totalTarget.toLocaleString()}`}
          icon={<FaMedal />}
          color="pink"
        />
      </div>

      {(overdueGoals > 0 || soonDeadlines > 0) && (
        <div className="alerts-section">
          <h3 className="alerts-title">
            <FaExclamationTriangle /> Alerts
          </h3>
          <div className="alerts-grid">
            {overdueGoals > 0 && (
              <div className="alert alert-danger">
                <span className="alert-icon">
                  <FaTimesCircle />
                </span>
                <div>
                  <strong>Overdue Goals</strong>
                  <p>
                    {overdueGoals} goal{overdueGoals !== 1 ? "s" : ""} past
                    deadline
                  </p>
                </div>
              </div>
            )}

            {soonDeadlines > 0 && (
              <div className="alert alert-warning">
                <span className="alert-icon">
                  <FaExclamationTriangle />
                </span>
                <div>
                  <strong>Upcoming Deadlines</strong>
                  <p>
                    {soonDeadlines} goal{soonDeadlines !== 1 ? "s" : ""} due
                    within 30 days
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="overall-progress">
        <h3>Overall Progress</h3>
        <div className="progress-bar large">
          <div
            className="progress-fill"
            style={{
              width: `${
                totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0
              }%`,
            }}
          />
        </div>
        <p className="progress-text">
          Ksh{totalSaved.toLocaleString()} / Ksh{totalTarget.toLocaleString()} (
          {totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(1) : 0}%
          complete)
        </p>
      </div>
    </div>
  );
}
