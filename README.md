# 👩‍💻 Smart Goal Planner

A beautiful and functional web app to track your savings goals built with Next.js and json-server.

## 🌐 Live Demo

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Set Up the Database**
   Place the db.json file in your project root (same level as package.json).

3. **Start the Application**
   -Option A: Run both servers together (Recommended)
   ```bash
   npm run dev:full
   ```
   -Option B: Run servers separately
   # Terminal 1 - Start json-server (backend)
   ```bash
   npm run json-server
   ```
   # Terminal 2 - Start Next.js (frontend)
   ```bash
   npm run dev 4. Open Your Browser
   ```
   Frontend: `bash http://localhost:3000`
   API: `bash http://localhost:3001`
   API Explorer: `bash  http://localhost:3001/goals`

```plaintext
📁 Project Structure
smart-goal-planner/
├── db.json # Database file for json-server
├── package.json # Project dependencies
├── src/
│ ├── app/
│ │ └── (main)/
│ │ ├── layout.js # Root layout
│ │ ├── page.js # Home page
│ │ └── globals.css # Global styles
│ ├── components/
│ │ ├── SmartGoalPlanner.js # Main app component
│ │ ├── Overview.js # Dashboard overview
│ │ ├── GoalCard.js # Individual goal display
│ │ ├── AddGoalForm.js # Add/edit goal form
│ │ ├── DepositForm.js # Make deposit form
│ │ ├── ProgressBar.js # Progress visualization
│ │ └── StatCard.js # Statistics display
│ └── lib/
│ └── api.js # API functions
```

## 📸Screenshot

![Smart Goal Planner Dashboard](./public/screenshot/Screenshot%202025-07-21%20183957.png)

## ✨ Features

📊 Overview Dashboard

- Total goals and completion statistics
- Total money saved vs target amounts
- Visual progress tracking
- Alerts for overdue goals and approaching deadlines

## 🎯 Goal Management (CRUD)

- ➕ Add Goals: Create new savings goals with target amounts and deadlines
- ✏️ Edit Goals: Modify existing goal details
- ❌ Delete Goals: Remove goals you no longer need
- 👀 View Goals: Beautiful card-based display with progress bars

## 💵 Deposit Tracking

- Make deposits toward specific goals
- Real-time progress updates
- Completion celebrations
- Preview deposit impact before confirming

## ⚠️ Smart Alerts

- Overdue goal warnings
- Deadline approaching notifications (30 days)
- Goal completion celebrations

## 🎨 Design Features

- Modern UI: Clean, professional design with smooth animations
- Responsive: Works perfectly on desktop, tablet, and mobile
- Progress Visualization: Beautiful progress bars and statistics
- Color-coded Status: Easy-to-understand visual indicators
- Intuitive Navigation: Tab-based interface for easy access

## 🛠️ Technical Details

1. **Frontend**

- Next.js 14: React framework with App Router
- Pure CSS: Custom styling with gradients and animations
- Client-side State: React hooks for state management

2. **Backend**

- json-server: Fake REST API for rapid development
- RESTful API: Standard HTTP methods (GET, POST, PATCH, DELETE)
- Local Storage: Data persisted in db.json file

## 📱 Usage Examples

Adding a Goal

- Click **"Add Goal"** button
- Fill in goal name, target amount, deadline, and description
- Click **"Add Goal"** to save

Making a Deposit

- Click **"Make Deposit"** button
- Select the goal from dropdown
- Enter deposit amount
- Review the preview and confirm

Tracking Progress

- View progress bars on individual goal cards
- Check overall progress in the Overview tab
- Monitor alerts for deadlines and overdue goals

## 🎯 Goal Status Indicators

💯 Completed: Goal amount reached
💹 Active: On track with time remaining
⚠️ Deadline Soon: Less than 30 days remaining
❌ Overdue: Past deadline and incomplete

## 🚀 Deployment Options

- Local Development
- Perfect for personal use - runs entirely on your machine.
- Production Deployment

Frontend: Deploy to Vercel
Backend: Replace json-server with a real database (PostgreSQL, MongoDB, etc.)

## 🤝 Contributing

This is a beginner-friendly project! Feel free to:

Add new features
Improve the UI/UX
Fix bugs
Add tests
Enhance documentation

## 📚 Learning Resources

This project demonstrates:

- Next.js App Router usage
- React hooks (useState, useEffect)
- API integration with fetch
- CSS animations and responsive design
- Modal components
- Form handling and validation

Perfect for learning modern web development! 🎓

## 👩‍💻 Author

**Grace Eileen Bass**

## 📝 License

This project is licensed under the [MIT License](LICENSE).
