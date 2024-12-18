import React, { useState } from "react";
import API from "../services/api";

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState("");

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/tasks", { title: task });
      onTaskAdded(response.data); // Calling the parent component to refresh the list
      setTask("");
    } catch (err) {
      alert("Error adding task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>
      <input
        type="text"
        name="task"
        placeholder="Task title"
        value={task}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
