import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskForm from "./pages/TaskForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<TaskForm />} /> 
        <Route path="/task/:id" element={<TaskForm />} /> {/* Support editing */}
      </Routes>
    </Router>
  );
}

export default App;
