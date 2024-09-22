import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]); // Holds all tasks
  const [activeTab, setActiveTab] = useState("inbox"); // Tracks the selected tab

  // Function to add a new task
  const addTask = () => {
    const taskText = prompt("Enter a new task:");
    if (taskText) {
      setTasks([...tasks, { text: taskText, completed: false }]);
    }
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Filter tasks based on the active tab
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "completed") return task.completed;
    if (activeTab === "notCompleted") return !task.completed;
    return true; // inbox shows all tasks
  });

  return (
    <div className="App">
      {/* Header with buttons */}
      <div className="App-header">
        <button onClick={() => setActiveTab("inbox")}>Inbox</button>
        <button onClick={() => setActiveTab("completed")}>Completed</button>
        <button onClick={() => setActiveTab("notCompleted")}>Pending</button>
      </div>

      {/* Body for tasks */}
      <div style={{ flex: 1 }}>
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />
              {task.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer with Add Task button (always visible in footer) */}
      <div className="App-footer">
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
}

export default App;
