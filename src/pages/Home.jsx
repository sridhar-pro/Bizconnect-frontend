import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TaskItem from "../components/TaskItem";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await axios.get("https://bizconnect-backend.onrender.com/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6 flex items-center justify-center gap-2">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"></path>
          </svg>
          Task Manager
        </h1>

        {/* Add Task Button */}
        <div className="text-center mb-6">
          <Link to="/task">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
              </svg>
              Add Task
            </button>
          </Link>
        </div>

        {/* Task List */}
        <div className="mt-4 space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem key={task.id} task={task} onDelete={handleDelete} />
            ))
          ) : (
            <p className="text-gray-600 text-center text-lg">No tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
