import React, { useState, useEffect } from "react";
import API from "../services/api";
import TaskForm from "../components/TaskForm";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Fetch tasks when the component is mounted
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to add a task to the list
  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div>
      <h1>Your Tasks</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
