import { useState } from "react";

export default function DepositForm({ isOpen, onClose, onSubmit, goals }) {
  const [formData, setFormData] = useState({
    goalId: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.goalId || !formData.amount) {
      alert("Please select a goal and enter an amount");
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    onSubmit(formData.goalId, parseFloat(formData.amount));

    // Reset form
    setFormData({
      goalId: "",
      amount: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  // Filtering out completed goals
  const activeGoals = goals.filter(
    (goal) => goal.savedAmount < goal.targetAmount
  );

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Make a Deposit</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="deposit-form">
          <div className="form-group">
            <label htmlFor="goalId">Select Goal *</label>
            <select
              id="goalId"
              name="goalId"
              value={formData.goalId}
              onChange={handleChange}
              required
            >
              <option value="">Choose a goal...</option>
              {activeGoals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.name} (Ksh{goal.savedAmount.toLocaleString()} / Ksh
                  {goal.targetAmount.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Deposit Amount (Ksh) *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="100.00"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          {formData.goalId && (
            <div className="deposit-preview">
              {(() => {
                const selectedGoal = goals.find((g) => g.id == formData.goalId);
                const depositAmount = parseFloat(formData.amount) || 0;
                const newTotal = selectedGoal.savedAmount + depositAmount;
                const remaining = Math.max(
                  0,
                  selectedGoal.targetAmount - newTotal
                );

                return (
                  <div className="preview-info">
                    <p>
                      <strong>Current:</strong> Ksh
                      {selectedGoal.savedAmount.toLocaleString()}
                    </p>
                    <p>
                      <strong>After deposit:</strong> Ksh
                      {newTotal.toLocaleString()}
                    </p>
                    <p>
                      <strong>Remaining:</strong> Ksh
                      {remaining.toLocaleString()}
                    </p>
                    {newTotal >= selectedGoal.targetAmount && (
                      <p className="success-message">
                        🎉 This will complete your goal!
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Make Deposit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
