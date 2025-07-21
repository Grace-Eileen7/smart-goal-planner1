// API functions for communicating with json-server
const API_BASE = "http://localhost:3001";

// Get all goals
export async function getGoals() {
  try {
    const response = await fetch(`${API_BASE}/goals`);
    if (!response.ok) throw new Error("Failed to fetch goals");
    return await response.json();
  } catch (error) {
    console.error("Error fetching goals:", error);
    return [];
  }
}

// Add a new goal
export async function addGoal(goal) {
  try {
    const response = await fetch(`${API_BASE}/goals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...goal,
        createdAt: new Date().toISOString().split("T")[0],
        savedAmount: 0,
      }),
    });
    if (!response.ok) throw new Error("Failed to add goal");
    return await response.json();
  } catch (error) {
    console.error("Error adding goal:", error);
    throw error;
  }
}

// Update a goal
export async function updateGoal(id, updates) {
  try {
    const response = await fetch(`${API_BASE}/goals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update goal");
    return await response.json();
  } catch (error) {
    console.error("Error updating goal:", error);
    throw error;
  }
}

// Delete a goal
export async function deleteGoal(id) {
  try {
    const response = await fetch(`${API_BASE}/goals/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete goal");
    return true;
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw error;
  }
}

// Make a deposit to a goal
export async function makeDeposit(goalId, amount) {
  try {
    // First get the current goal
    const response = await fetch(`${API_BASE}/goals/${goalId}`);
    if (!response.ok) throw new Error("Failed to fetch goal");
    const goal = await response.json();

    // Update saved amount
    const newSavedAmount = goal.savedAmount + parseFloat(amount);

    return await updateGoal(goalId, { savedAmount: newSavedAmount });
  } catch (error) {
    console.error("Error making deposit:", error);
    throw error;
  }
}
