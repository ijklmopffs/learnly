import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/home";
import Quiz from "./pages/quiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default App;
