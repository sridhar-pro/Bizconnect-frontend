import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TaskForm = () => {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    if (id) {
      loadTask();
    }
  }, [id]);

  const loadTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
      setTask(response.data); // Prefill form with task details
    } catch (error) {
      console.error("Error loading task:", error);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Update task
        await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
      } else {
        // Add new task
        await axios.post("http://localhost:5000/api/tasks", task);
      }
      navigate("/"); // Redirect back to home page
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6 flex items-center justify-center gap-2">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"></path>
          </svg>
          {id ? "Edit Task" : "Add Task"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task Title Input */}
          <div>
            <label className="block text-gray-700 font-medium">Task Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Task Description Input */}
          <div>
            <label className="block text-gray-700 font-medium">Task Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none h-28"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
            </svg>
            {id ? "Update Task" : "Save Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
