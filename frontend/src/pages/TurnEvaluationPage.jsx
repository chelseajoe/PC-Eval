// // Backend version

// import React, { useEffect, useState } from "react";
// import EvaluationViewer from "../components/EvaluationViewer";
// import { fetchResultFiles, fetchResultFile } from "../services/api";

// const TurnEvaluationPage = () => {
//   const [files, setFiles] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [turns, setTurns] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadFiles = async () => {
//       try {
//         const data = await fetchResultFiles();
//         setFiles(data.files);
//         if (data.files.length > 0) {
//           setSelectedFile(data.files[0]);
//           setLoading(true);
//           const initialData = await fetchResultFile(data.files[0]);
//           setTurns(initialData);
//         }
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadFiles();
//   }, []);

//   const handleFileChange = async (e) => {
//     const filename = e.target.value;
//     setSelectedFile(filename);
//     setLoading(true);
//     try {
//       const fileData = await fetchResultFile(filename);
//       setTurns(fileData);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-4">

//       {/* Simple, differentiated selector */}
//       <div
//         className="card mb-4"
//         style={{
//           backgroundColor: "#f8f9fa",
//           border: "1px solid #ddd",
//           boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
//         }}
//       >
//         <div
//           className="card-header"
//           style={{
//             fontSize: "1rem",
//             fontWeight: 500,
//             backgroundColor: "#e9ecef",
//             borderBottom: "1px solid #ddd"
//           }}
//         >
//           Choose Evaluation File
//         </div>
//         <div className="card-body">
//           <select
//             className="form-select"
//             value={selectedFile || ""}
//             onChange={handleFileChange}
//             style={{ maxWidth: "400px" }}
//           >
//             <option value="">-- Select a JSON file --</option>
//             {files.map((f) => (
//               <option key={f} value={f}>
//                 {f}
//               </option>
//             ))}
//           </select>

//           {loading && <p className="mt-2 mb-0 text-muted">Loading evaluation...</p>}
//           {error && <p className="mt-2 mb-0 text-danger">{error.message}</p>}
//         </div>
        
//       </div>

//       {/* Evaluation viewer */}
//       {/* {turns && Array.isArray(turns) && turns.length > 0 && (
//         <EvaluationViewer allEntries={turns} />
//       )} */}

//       {/* Reserve space so the page does NOT jump when viewer loads */}
// <div style={{ minHeight: "600px" }}>
//   {turns && Array.isArray(turns) && turns.length > 0 ? (
//     <EvaluationViewer allEntries={turns} />
//   ) : (
//     <div className="text-muted">Loading viewer…</div>
//   )}
// </div>
//     </div>
//   );
// };

// export default TurnEvaluationPage;


import React, { useEffect, useState } from "react";
import EvaluationViewer from "../components/EvaluationViewer";
import { fetchResultFiles, fetchResultFile } from "../services/api";

const TurnEvaluationPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [turns, setTurns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load file list and first file on mount
  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      try {
        const data = await fetchResultFiles();
        setFiles(data);

        if (data.length > 0) {
          const firstFile = data[0];
          setSelectedFile(firstFile);
          const initialTurns = await fetchResultFile(firstFile);
          setTurns(initialTurns);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadFiles();
  }, []);

  // Handle file selection change
  const handleFileChange = async (e) => {
    const filename = e.target.value;
    setSelectedFile(filename);
    setLoading(true);
    try {
      const fileData = await fetchResultFile(filename);
      setTurns(fileData);
      setError(null);
    } catch (err) {
      setError(err);
      setTurns([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      {/* File selector */}
      <div className="card mb-4" style={{ backgroundColor: "#f8f9fa", border: "1px solid #ddd", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
        <div className="card-header" style={{ fontSize: "1rem", fontWeight: 500, backgroundColor: "#e9ecef", borderBottom: "1px solid #ddd" }}>
          Choose Evaluation File
        </div>
        <div className="card-body">
          <select
            className="form-select"
            value={selectedFile}
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
      <div style={{ minHeight: "600px" }}>
        {turns && Array.isArray(turns) && turns.length > 0 ? (
          <EvaluationViewer allEntries={turns} />
        ) : (
          !loading && <div className="text-muted">No evaluation data available.</div>
        )}
      </div>
    </div>
  );
};

export default TurnEvaluationPage;
