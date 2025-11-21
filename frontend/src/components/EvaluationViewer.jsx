import React, { useState } from "react";
import EvaluationDisplay from "./EvaluationDisplay";

const EvaluationViewer = ({ allEntries }) => {
  if (!allEntries || allEntries.length === 0) {
    return <p>No evaluation turns found.</p>;
  }

  const defaultIndex = allEntries.length - 1; // show last turn
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  return (
    <div className="container mt-4">

      {/* Turn Selector */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Turn Evaluations</h4>

          <select
            className="form-select w-auto"
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
          >
            {allEntries.map((entry, idx) => (
              <option key={idx} value={idx}>
                Turn {entry.turn_index}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display selected turn */}
      <EvaluationDisplay entry={allEntries[selectedIndex]} />
    </div>
  );
};

export default EvaluationViewer;
