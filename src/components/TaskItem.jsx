import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://bizconnect-backend.onrender.com");

const TaskItem = ({ task, onDelete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("deleteTask", (deletedTaskId) => {
      if (task.id === deletedTaskId) {
        onDelete(deletedTaskId);
      }
    });

    return () => {
      socket.off("deleteTask");
    };
  }, [task, onDelete]);

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-lg p-5 rounded-xl shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
        <p className="text-gray-600 text-sm">{task.description}</p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => navigate(`/task/${task.id}`)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
          Edit
        </button>
        <button
          onClick={() => {
            socket.emit("deleteTask", task.id); // Emit delete event
            onDelete(task.id);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
