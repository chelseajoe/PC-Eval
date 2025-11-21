import React from "react";
import { Link } from "react-router-dom";

const MainScreen = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Clinical Evaluation Dashboard</h1>
      <p>Welcome! Use the navigation above or below to go to different pages:</p>

      <ul>
        <li><Link to="/evaluations">View Turn Evaluations</Link></li>
        <li><Link to="/options">Modify Evaluation Options</Link></li>
      </ul>
    </div>
  );
};

export default MainScreen;
