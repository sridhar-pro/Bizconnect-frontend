import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import TaskItem from "../components/TaskItem";
import { motion } from "framer-motion";

const socket = io("https://bizconnect-backend.onrender.com"); // Connect to WebSocket server

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();

    // Listen for real-time task updates
    socket.on("taskCreated", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    });

    socket.on("taskDeleted", (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
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
      await axios.delete(`https://bizconnect-backend.onrender.com/api/tasks/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg shadow-xl rounded-3xl p-10 w-full max-w-3xl border border-white/20"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-white text-center mb-6 flex items-center justify-center gap-2 uppercase"
        >
          <svg className="w-10 h-10 text-blue-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"></path>
          </svg>
          Task Manager
        </motion.h1>

        <motion.div whileHover={{ scale: 1.05 }} className="text-center mb-6">
          <Link to="/task">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-semibold italic rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
              </svg>
              Add Task
            </button>
          </Link>
        </motion.div>

        <div className="mt-4 space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TaskItem task={task} onDelete={handleDelete} />
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-300 text-center text-lg"
            >
              No tasks found.
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
