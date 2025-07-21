"use client";

import { useState, useEffect } from "react";
import {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
  makeDeposit,
} from "../../lib/api";
import Overview from "./Overview";
import GoalCard from "./GoalCard";
import AddGoalForm from "./AddGoalForm";
import DepositForm from "./DepositForm";

export default function SmartGoalPlanner() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Load goals when component mounts
  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    setLoading(true);
    try {
      const fetchedGoals = await getGoals();
      setGoals(fetchedGoals);
    } catch (error) {
      alert(
        "Failed to load goals. Make sure json-server is running on port 3001."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (goalData) => {
    try {
      if (editingGoal) {
        // Update existing goal
        const updatedGoal = await updateGoal(editingGoal.id, goalData);
        setGoals(goals.map((g) => (g.id === editingGoal.id ? updatedGoal : g)));
        setEditingGoal(null);
      } else {
        // Add new goal
        const newGoal = await addGoal(goalData);
        setGoals([...goals, newGoal]);
      }
      setShowAddForm(false);
    } catch (error) {
      alert("Failed to save goal. Please try again.");
    }
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setShowAddForm(true);
  };

  const handleDeleteGoal = async (goalId) => {
    if (!confirm("Are you sure you want to delete this goal?")) {
      return;
    }

    try {
      await deleteGoal(goalId);
      setGoals(goals.filter((g) => g.id !== goalId));
    } catch (error) {
      alert("Failed to delete goal. Please try again.");
    }
  };

  const handleDeposit = async (goalId, amount) => {
    try {
      const updatedGoal = await makeDeposit(goalId, amount);
      setGoals(goals.map((g) => (g.id === goalId ? updatedGoal : g)));
      setShowDepositForm(false);

      // Check if goal is now completed
      if (updatedGoal.savedAmount >= updatedGoal.targetAmount) {
        alert(
          `🎉 Congratulations! You've completed your "${updatedGoal.name}" goal!`
        );
      }
    } catch (error) {
      alert("Failed to make deposit. Please try again.");
    }
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setEditingGoal(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your goals...</p>
      </div>
    );
  }

  return (
    <div className="smart-goal-planner">
      <header className="app-header">
        <h1 className="app-title">👩‍💻 Smart Goal Planner</h1>
        <p className="app-subtitle">
          Track your savings goals and achieve your dreams!
        </p>

        <div className="header-actions">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            ➕ Add Goal
          </button>
          <button
            className="btn btn-success"
            onClick={() => setShowDepositForm(true)}
            disabled={goals.length === 0}
          >
            💳 Make Deposit
          </button>
        </div>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Overview
        </button>
        <button
          className={`tab-btn ${activeTab === "goals" ? "active" : ""}`}
          onClick={() => setActiveTab("goals")}
        >
          🎯 Goals ({goals.length})
        </button>
      </nav>

      <main className="app-main">
        {activeTab === "overview" && (
          <div className="tab-content">
            <Overview goals={goals} />
          </div>
        )}

        {activeTab === "goals" && (
          <div className="tab-content">
            <div className="goals-header">
              <h2>Your Goals</h2>
              {goals.length === 0 && (
                <p className="empty-state">
                  No goals yet! Click "Add Goal" to create your first savings
                  goal.
                </p>
              )}
            </div>

            <div className="goals-grid">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleEditGoal}
                  onDelete={handleDeleteGoal}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <AddGoalForm
        isOpen={showAddForm}
        onClose={closeAddForm}
        onSubmit={handleAddGoal}
        editingGoal={editingGoal}
      />

      <DepositForm
        isOpen={showDepositForm}
        onClose={() => setShowDepositForm(false)}
        onSubmit={handleDeposit}
        goals={goals}
      />
    </div>
  );
}
