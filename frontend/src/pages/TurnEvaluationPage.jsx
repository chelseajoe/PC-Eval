// import React, { useEffect, useState } from "react";
// import EvaluationDisplay from "../components/EvaluationDisplay";
// import EvaluationOptions from "../components/EvaluationOptions";
// import { fetchTurns, fetchOptions, runEvaluation } from "../services/api";
// import EvaluationViewer from "../components/EvaluationViewer";


// const TurnEvaluationPage = () => {
//   const [turns, setTurns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [options, setOptions] = useState(null);
//   const [selected, setSelected] = useState({
//     model: "gpt-5",
//     template: "step_by_step_evaluation_prompt_v1.txt",
//     user_conversation: "user_conversation.json",
//     clinical_case: "clinical_case.json"
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const turnsData = await fetchTurns();
//         const opts = await fetchOptions();
//         setTurns(turnsData);
//         setOptions(opts);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSelectChange = (key, value) => {
//     setSelected({ ...selected, [key]: value });
//   };

//   const handleRunEvaluation = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         user_conversation_path: `demo_json_files/${selected.user_conversation}`,
//         clinical_case_path: `demo_json_files/${selected.clinical_case}`,
//         template_path: `prompts/templates/${selected.template}`,
//         model: selected.model,
//         index: 1
//       };
//       await runEvaluation(payload);
//       const updatedTurns = await fetchTurns();
//       setTurns(updatedTurns);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

//   return (

//    <div style={{ marginTop: "20px" }}>
//   <EvaluationViewer allEntries={turns} />
// </div>

//   );
// };

// export default TurnEvaluationPage;


import React, { useEffect, useState } from "react";
import EvaluationViewer from "../components/EvaluationViewer";
import { fetchResultFiles, fetchResultFile, fetchOptions, runEvaluation } from "../services/api";

const TurnEvaluationPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [turns, setTurns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      const data = await fetchResultFiles();
      setFiles(data.files);
    };
    loadFiles();
  }, []);

  const handleFileChange = async (e) => {
    const filename = e.target.value;
    setSelectedFile(filename);
    setLoading(true);
    const fileData = await fetchResultFile(filename);
    setTurns(fileData);
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Select Evaluation File</h2>

      <select
        value={selectedFile || ""}
        onChange={handleFileChange}
        style={{ padding: "8px", marginBottom: "20px" }}
      >
        <option value="">-- Choose a JSON file --</option>
        {files.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      {turns && Array.isArray(turns) && (
        <EvaluationViewer allEntries={turns} />
      )}
    </div>
  );
};

export default TurnEvaluationPage;
