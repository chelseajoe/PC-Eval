// import React, { useState } from "react";
// import EvaluationDisplay from "./EvaluationDisplay";

// const EvaluationViewer = ({ allEntries }) => {
//   if (!allEntries || allEntries.length === 0) {
//     return <p>No evaluation turns found.</p>;
//   }

//   const defaultIndex = allEntries.length - 1; // show last turn
//   const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

//   return (
//     <div className="container mt-4">

//       {/* Turn Selector */}
//       <div className="card shadow-sm mb-4">
//         <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
//           <h4 className="mb-0">Turn Evaluations</h4>

//           <select
//             className="form-select w-auto"
//             value={selectedIndex}
//             onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
//           >
//             {allEntries.map((entry, idx) => (
//               <option key={idx} value={idx}>
//                 Turn {entry.turn_index}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Display selected turn */}
//       <EvaluationDisplay entry={allEntries[selectedIndex]} />
//     </div>
//   );
// };

// export default EvaluationViewer;


// import React, { useState } from "react";
// import EvaluationDisplay from "./EvaluationDisplay";

// const EvaluationViewer = ({ allEntries }) => {
//   if (!allEntries || allEntries.length === 0) {
//     return <p>No evaluation turns found.</p>;
//   }

//   const defaultIndex = allEntries.length - 1; // show last turn
//   const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

//   const handleSliderChange = (e) => {
//     setSelectedIndex(parseInt(e.target.value));
//   };

//   return (
//     <div className="container mt-4">

//       {/* Turn Selector Slider */}
//       <div className="card shadow-sm mb-4">
//         <div className="card-header bg-secondary text-white">
//           <h4 className="mb-0">Turn Evaluations</h4>
//         </div>
//         <div className="card-body">
//           <div className="d-flex align-items-center mb-3">
//             <span className="me-3 fw-semibold">Turn {allEntries[selectedIndex].turn_index}</span>
//             <input
//               type="range"
//               min="0"
//               max={allEntries.length - 1}
//               step="1"
//               value={selectedIndex}
//               onChange={handleSliderChange}
//               className="form-range"
//               style={{ flex: 1 }}
//             />
//             <span className="ms-3 text-muted">
//               {selectedIndex + 1} / {allEntries.length}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Display selected turn */}
//       <EvaluationDisplay entry={allEntries[selectedIndex]} />
//     </div>
//   );
// };

// export default EvaluationViewer;

import React, { useState, useEffect } from "react";
import EvaluationDisplay from "./EvaluationDisplay";

const EvaluationViewer = ({ allEntries }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (allEntries && allEntries.length > 0) {
      setSelectedIndex(0);
    }
  }, [allEntries]);

  // Always render stable layout
  if (!allEntries || allEntries.length === 0) {
    return (
      <div className="container mt-4">
        <div className="card shadow-sm mb-4" style={{ height: "140px" }}>
          <div className="card-header bg-secondary text-white">
            <h4 className="mb-0">Turn Evaluations</h4>
          </div>
          <div className="card-body d-flex align-items-center justify-content-center">
            <span className="text-muted">Loading evaluation turns…</span>
          </div>
        </div>
      </div>
    );
  }

  const currentEntry =
    allEntries[selectedIndex] ?? allEntries[0];

  return (
    <div className="container mt-4">

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-secondary text-white">
          <h4 className="mb-0">Turn Evaluations</h4>
        </div>

        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <span className="me-3 fw-semibold">
              Turn {currentEntry?.turn_index ?? "—"}
            </span>

            <input
              type="range"
              min="0"
              max={allEntries.length - 1}
              step="1"
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
              className="form-range"
              style={{ flex: 1 }}
            />

            <span className="ms-3 text-muted">
              {selectedIndex + 1} / {allEntries.length}
            </span>
          </div>
        </div>
      </div>

      <EvaluationDisplay entry={currentEntry} />
    </div>
  );
};

export default EvaluationViewer;

