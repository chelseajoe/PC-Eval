import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import TurnEvaluationPage from "./pages/TurnEvaluationPage";
import OptionsPage from "./pages/OptionsPage";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Main</Link>
        <Link to="/evaluations" style={{ marginRight: "10px" }}>Turn Evaluations</Link>
        <Link to="/options">Options</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/evaluations" element={<TurnEvaluationPage />} />
        <Route path="/options" element={<OptionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
