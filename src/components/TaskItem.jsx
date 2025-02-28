import React from "react";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-lg p-5 rounded-xl shadow-lg flex justify-between items-center transition-all duration-300 hover:shadow-xl">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
        <p className="text-gray-600 text-sm">{task.description}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/task/${task.id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5h2M5 12h14M12 5v14"></path>
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
