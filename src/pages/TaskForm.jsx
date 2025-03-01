import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { io } from "socket.io-client";

const socket = io("https://bizconnect-backend.onrender.com"); 

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    if (id) {
      loadTask();
    }
  }, [id]);

  const loadTask = async () => {
    try {
      const response = await axios.get(`https://bizconnect-backend.onrender.com/api/tasks/${id}`);
      setTask(response.data);
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
        const updatedTask = await axios.put(`https://bizconnect-backend.onrender.com/api/tasks/${id}`, task);
        socket.emit("updateTask", updatedTask.data); // Emit event to WebSocket
      } else {
        const newTask = await axios.post("https://bizconnect-backend.onrender.com/api/tasks", task);
        socket.emit("newTask", newTask.data); // Emit event to WebSocket
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-white/20"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-3xl font-extrabold text-gray-100 text-center mb-6 flex items-center justify-center gap-2 uppercase"
        >
          {id ? "Edit Task" : "Add Task"}
        </motion.h2>

        <motion.form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-100 font-medium italic">Task Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-100 font-medium italic">Task Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
              className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 h-28"
              required
            ></textarea>
          </div>
          <motion.button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 font-semibold rounded-xl">
            {id ? "Update Task" : "Save Task"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default TaskForm;
