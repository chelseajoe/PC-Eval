// import React, { useEffect, useState } from "react";
// import EvaluationViewer from "../components/EvaluationViewer";
// import { fetchResultFiles, fetchResultFile, fetchOptions, runEvaluation } from "../services/api";

// const TurnEvaluationPage = () => {
//   const [files, setFiles] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [turns, setTurns] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [options, setOptions] = useState(null);

//   useEffect(() => {
//     const loadFiles = async () => {
//       const data = await fetchResultFiles();
//       setFiles(data.files);
//     };
//     loadFiles();
//   }, []);

//   const handleFileChange = async (e) => {
//     const filename = e.target.value;
//     setSelectedFile(filename);
//     setLoading(true);
//     const fileData = await fetchResultFile(filename);
//     setTurns(fileData);
//     setLoading(false);
//   };

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <h2>Select Evaluation File</h2>

//       <select
//         value={selectedFile || ""}
//         onChange={handleFileChange}
//         style={{ padding: "8px", marginBottom: "20px" }}
//       >
//         <option value="">-- Choose a JSON file --</option>
//         {files.map((f) => (
//           <option key={f} value={f}>
//             {f}
//           </option>
//         ))}
//       </select>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error.message}</p>}

//       {turns && Array.isArray(turns) && (
//         <EvaluationViewer allEntries={turns} />
//       )}
//     </div>
//   );
// };

// export default TurnEvaluationPage;

import React, { useEffect, useState } from "react";
import EvaluationViewer from "../components/EvaluationViewer";
import { fetchResultFiles, fetchResultFile } from "../services/api";

const TurnEvaluationPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [turns, setTurns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const data = await fetchResultFiles();
        setFiles(data.files);
        if (data.files.length > 0) {
          setSelectedFile(data.files[0]);
          setLoading(true);
          const initialData = await fetchResultFile(data.files[0]);
          setTurns(initialData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadFiles();
  }, []);

  const handleFileChange = async (e) => {
    const filename = e.target.value;
    setSelectedFile(filename);
    setLoading(true);
    try {
      const fileData = await fetchResultFile(filename);
      setTurns(fileData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      {/* Simple, differentiated selector */}
      <div
        className="card mb-4"
        style={{
          backgroundColor: "#f8f9fa",
          border: "1px solid #ddd",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}
      >
        <div
          className="card-header"
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            backgroundColor: "#e9ecef",
            borderBottom: "1px solid #ddd"
          }}
        >
          Choose Evaluation File
        </div>
        <div className="card-body">
          <select
            className="form-select"
            value={selectedFile || ""}
            onChange={handleFileChange}
            style={{ maxWidth: "400px" }}
          >
            <option value="">-- Select a JSON file --</option>
            {files.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          {loading && <p className="mt-2 mb-0 text-muted">Loading evaluation...</p>}
          {error && <p className="mt-2 mb-0 text-danger">{error.message}</p>}
        </div>
        
      </div>

      {/* Evaluation viewer */}
      {/* {turns && Array.isArray(turns) && turns.length > 0 && (
        <EvaluationViewer allEntries={turns} />
      )} */}

      {/* Reserve space so the page does NOT jump when viewer loads */}
<div style={{ minHeight: "600px" }}>
  {turns && Array.isArray(turns) && turns.length > 0 ? (
    <EvaluationViewer allEntries={turns} />
  ) : (
    <div className="text-muted">Loading viewer…</div>
  )}
</div>
    </div>
  );
};

export default TurnEvaluationPage;
