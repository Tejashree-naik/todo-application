import React, { useState } from "react";
import "./App.css";

function App() {
  // Holds predefined tasks with ids and names
  const [tasks, setTasks] = useState([
    { id: 1, name: "Shopping", completed: false },
    { id: 2, name: "Cooking", completed: false },
    { id: 3, name: "Watching movies", completed: false },
  ]);

  const [activeTab, setActiveTab] = useState("inbox"); // Tracks the selected tab

  // Function to add a new task
  const addTask = () => {
    const taskText = prompt("Enter a new task:");
    if (taskText) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, name: taskText, completed: false },
      ]);
    }
  };

  // Toggle task completion
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
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
      <h1 style={{ textAlign: "center" }}>Todoist Dashboard</h1>
      {/* Header with buttons */}
      <div className="App-header">
        <button onClick={() => setActiveTab("inbox")}>Inbox</button>
        <button onClick={() => setActiveTab("completed")}>Completed</button>
        <button onClick={() => setActiveTab("notCompleted")}>Pending</button>
      </div>

      {/* Body for tasks */}
      <div style={{ flex: 1 }}>
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              {task.name}
              {/* Delete button */}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
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
