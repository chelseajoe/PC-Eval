

// import React from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register chart elements
// ChartJS.register(ArcElement, Tooltip, Legend);

// // Pie chart plugin to show percentages on slices
// const pieLabelPlugin = {
//   id: "pieLabelPlugin",
//   afterDraw(chart) {
//     const { ctx } = chart;
//     const dataset = chart.data.datasets[0];
//     const total = dataset.data.reduce((a, b) => a + b, 0);

//     chart.getDatasetMeta(0).data.forEach((arc, i) => {
//       const value = dataset.data[i];
//       if (value === 0) return;
//       const percent = ((value / total) * 100).toFixed(0) + "%";
//       const { x, y } = arc.tooltipPosition();
//       ctx.save();
//       ctx.fillStyle = "white";
//       ctx.font = "bold 14px sans-serif";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText(percent, x, y);
//       ctx.restore();
//     });
//   },
// };

// ChartJS.register(pieLabelPlugin);

// const pieOptions = {
//   plugins: {
//     legend: { display: false },
//     tooltip: { enabled: true, position: "nearest" },
//   },
//   maintainAspectRatio: false,
// };

// const EvaluationDisplay = ({ entry }) => {
//   if (!entry?.response_json)
//     return <p>Response not available for turn {entry?.turn_index}</p>;

//   const { conversation_context, rubric_evaluation, overall_summary, recommendations } =
//     entry.response_json;

//   // Filter categories with at least 1 turn spent
//   const filteredEntries = Object.entries(rubric_evaluation).filter(
//     ([_, v]) => v.turns_spent > 0
//   );

//   const categories = filteredEntries.map(([cat]) => cat);
//   const turns = filteredEntries.map(([_, v]) => v.turns_spent); // Use turns_spent for pie slices
//   const colors = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"].slice(
//     0,
//     turns.length
//   );

//   const pieData = { labels: categories, datasets: [{ label: "Turns", data: turns, backgroundColor: colors }] };

//   // Legend items based on turns spent
//   const totalTurns = turns.reduce((a, b) => a + b, 0);
//   const legendItems = categories.map((label, idx) => ({
//     label,
//     color: colors[idx],
//     percent: ((turns[idx] / totalTurns) * 100).toFixed(0) + "%",
//   }));

//   const currentTurn = conversation_context.current_turn;

//   return (
//     <div className="card mb-5 shadow-sm border-0">
//       <div className="card-header bg-primary text-white py-3">
//         <h3 className="mb-0 fw-bold">Turn {entry.turn_index}</h3>
//       </div>

//       <div className="card-body">
//         {/* Conversation */}
//         <h4 className="fw-semibold mb-3">Conversation</h4>
//         <div className="ps-3 mb-4">
//           <p className="mb-2">
//             <strong>Student:</strong>
//             <br />
//             <span className="text-secondary">{currentTurn.user_text}</span>
//           </p>
//           <p className="mb-0">
//             <strong>Patient:</strong>
//             <br />
//             <span className="text-secondary">{currentTurn.assistant_text}</span>
//           </p>
//         </div>

//         <h5 className="fw-semibold mt-4">Evaluation Notes</h5>
//         {/* <p className="text-secondary">{conversation_context.summary_of_full_conversation}</p> */}
//                 <p className="text-secondary">{conversation_context.turn_analysis_summary}</p>


//         <hr className="my-4" />

//         {/* Rubric Evaluation */}
//         <h4 className="fw-semibold mb-3">Rubric Evaluation</h4>
//         <div className="mb-4">
//           {Object.entries(rubric_evaluation).map(([cat, val]) => {
//             const maxScore = val.max_score || 10;
//             let progressColor = "bg-success";
//             if (val.score < maxScore / 2) progressColor = "bg-danger";
//             else if (val.score < maxScore) progressColor = "bg-warning";

//             return (
//               <div key={cat} className="mb-3 p-3 border rounded shadow-sm">
//                 <div className="d-flex justify-content-between align-items-center mb-1">
//                   <strong>{cat}</strong>
//                   <span>
//                     {val.score} / {maxScore}
//                   </span>
//                 </div>
//                 <div className="progress" style={{ height: "20px" }}>
//                   <div
//                     className={`progress-bar ${progressColor}`}
//                     role="progressbar"
//                     style={{ width: `${(val.score / maxScore) * 100}%` }}
//                     aria-valuenow={val.score}
//                     aria-valuemin="0"
//                     aria-valuemax={maxScore}
//                   ></div>
//                 </div>
//                 {val.comment && <p className="mt-2 text-secondary mb-0">{val.comment}</p>}
//                 <small className="text-muted">Turns Spent: {val.turns_spent}</small>
//               </div>
//             );
//           })}
//         </div>

//         {/* Pie Chart */}
//         <h4 className="fw-semibold mb-3">Category Turn Distribution</h4>
//         <div className="d-flex flex-column align-items-center mb-4">
//           <div style={{ width: 400, height: 400 }}>
//             <Pie data={pieData} options={pieOptions} />
//           </div>

//           {/* Legend */}
//           <ul className="list-unstyled mt-3" style={{ width: "100%", maxWidth: 300 }}>
//             {legendItems.map((item, idx) => (
//               <li
//                 key={idx}
//                 className="d-flex justify-content-between align-items-center mb-1"
//                 style={{ fontSize: 14 }}
//               >
//                 <div className="d-flex align-items-center">
//                   <span
//                     style={{
//                       display: "inline-block",
//                       width: 13,
//                       height: 13,
//                       backgroundColor: item.color,
//                       marginRight: 12,
//                       borderRadius: 2,
//                     }}
//                   />
//                   <span style={{ fontWeight: 500 }}>{item.label}</span>
//                 </div>
//                 <span style={{ fontWeight: 500, marginLeft: 20 }}>{item.percent}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <hr className="my-4" />

//         {/* Overall Summary */}
//         <h4 className="fw-semibold mb-3">Overall Summary</h4>
//         <div className="bg-light p-3 rounded">
//           <p>
//             <strong>Total Score:</strong> {overall_summary.total_score} / {overall_summary.maximum_score}
//           </p>
//           <p>
//             <strong>Performance Level:</strong>{" "}
//             <span className="badge bg-secondary">{overall_summary.performance_level}</span>
//           </p>
//           <h6 className="fw-bold mt-3">Summary Comment</h6>
//           <p className="text-secondary" style={{ whiteSpace: "pre-wrap" }}>
//             {overall_summary.summary_comment}
//           </p>
//         </div>

//         <hr className="my-4" />

//         {/* Recommendations */}
//         <h4 className="fw-semibold mb-3">Recommendations</h4>
//         <ul className="list-group">
//           {recommendations.map((rec, idx) => (
//             <li key={idx} className="list-group-item">
//               {rec}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default EvaluationDisplay;


// import React from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register chart elements
// ChartJS.register(ArcElement, Tooltip, Legend);

// // Pie chart plugin to show percentages on slices
// const pieLabelPlugin = {
//   id: "pieLabelPlugin",
//   afterDraw(chart) {
//     const { ctx } = chart;
//     const dataset = chart.data.datasets[0];
//     const total = dataset.data.reduce((a, b) => a + b, 0);

//     chart.getDatasetMeta(0).data.forEach((arc, i) => {
//       const value = dataset.data[i];
//       if (value === 0) return;
//       const percent = ((value / total) * 100).toFixed(0) + "%";
//       const { x, y } = arc.tooltipPosition();
//       ctx.save();
//       ctx.fillStyle = "white";
//       ctx.font = "bold 14px sans-serif";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText(percent, x, y);
//       ctx.restore();
//     });
//   },
// };

// ChartJS.register(pieLabelPlugin);

// const pieOptions = {
//   plugins: {
//     legend: { display: false },
//     tooltip: { enabled: true, position: "nearest" },
//   },
//   maintainAspectRatio: false,
// };

// const EvaluationDisplay = ({ entry, entries }) => {
//   if (!entry?.response_json)
//     return <p>Response not available for turn {entry?.turn_index}</p>;

//   // Fallback if entries is not passed
//   const allEntries = entries || [entry];

//   const {
//     conversation_context,
//     rubric_evaluation,
//     overall_summary,
//     recommendations,
//   } = entry.response_json;

//   // Filter categories with at least 1 turn spent
//   const filteredEntries = Object.entries(rubric_evaluation).filter(
//     ([_, v]) => v.turns_spent > 0
//   );

//   const categories = filteredEntries.map(([cat]) => cat);
//   const turns = filteredEntries.map(([_, v]) => v.turns_spent);
//   const colors = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"].slice(
//     0,
//     turns.length
//   );

//   const pieData = {
//     labels: categories,
//     datasets: [
//       { label: "Turns", data: turns, backgroundColor: colors },
//     ],
//   };

//   const totalTurns = turns.reduce((a, b) => a + b, 0);
//   const legendItems = categories.map((label, idx) => ({
//     label,
//     color: colors[idx],
//     percent: totalTurns ? ((turns[idx] / totalTurns) * 100).toFixed(0) + "%" : "0%",
//   }));

//   const currentTurn = conversation_context.current_turn;

//   return (
//     <div className="card mb-5 shadow-sm border-0">
//       <div className="card-header bg-primary text-white py-3">
//         <h3 className="mb-0 fw-bold">Turn {entry.turn_index}</h3>
//       </div>

//       <div className="card-body">

//         {/* =============================== */}
//         {/* Annotated Conversation Section */}
//         {/* =============================== */}
//         <h4 className="fw-semibold mb-3">Annotated Conversation (Full Dialogue)</h4>

//         <div className="ps-3 mb-4">
//           {allEntries.map((e, idx) => {
//             const turn = e.response_json.conversation_context.current_turn;
//             const summary =
//               e.response_json.conversation_context.turn_analysis_summary;

//             return (
//               <div key={idx} className="mb-4 p-3 border rounded bg-light">
//                 <div className="mb-2">
//                   <strong className="text-primary">
//                     Turn {e.turn_index}
//                   </strong>
//                 </div>

//                 {/* Student */}
//                 <div className="mb-3">
//                   <p className="mb-1">
//                     <strong>Student:</strong><br />
//                     <span className="text-dark">{turn.user_text}</span>
//                   </p>
//                 </div>

//                 {/* Patient */}
//                 <div className="mb-3">
//                   <p className="mb-1">
//                     <strong>Patient:</strong><br />
//                     <span className="text-dark">{turn.assistant_text}</span>
//                   </p>
//                 </div>

//                 {/* Annotation */}
//                 {summary && (
//                   <p className="text-success small mb-0">
//                     ✓ {summary}
//                   </p>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         <hr className="my-4" />

//         {/* =============================== */}
//         {/* Current Turn Conversation */}
//         {/* =============================== */}
//         <h4 className="fw-semibold mb-3">Conversation</h4>
//         <div className="ps-3 mb-4">
//           <p className="mb-2">
//             <strong>Student:</strong><br />
//             <span className="text-secondary">{currentTurn.user_text}</span>
//           </p>
//           <p className="mb-0">
//             <strong>Patient:</strong><br />
//             <span className="text-secondary">{currentTurn.assistant_text}</span>
//           </p>
//         </div>

//         {/* Turn Analysis */}
//         <h5 className="fw-semibold mt-4">Evaluation Notes</h5>
//         <p className="text-secondary">
//           {conversation_context.turn_analysis_summary}
//         </p>

//         <hr className="my-4" />

//         {/* =============================== */}
//         {/* Rubric Evaluation */}
//         {/* =============================== */}
//         <h4 className="fw-semibold mb-3">Rubric Evaluation</h4>
//         <div className="mb-4">
//           {Object.entries(rubric_evaluation).map(([cat, val]) => {
//             const maxScore = val.max_score || 10;
//             let progressColor = "bg-success";
//             if (val.score < maxScore / 2) progressColor = "bg-danger";
//             else if (val.score < maxScore) progressColor = "bg-warning";

//             return (
//               <div key={cat} className="mb-3 p-3 border rounded shadow-sm">
//                 <div className="d-flex justify-content-between align-items-center mb-1">
//                   <strong>{cat}</strong>
//                   <span>
//                     {val.score} / {maxScore}
//                   </span>
//                 </div>

//                 <div className="progress" style={{ height: "20px" }}>
//                   <div
//                     className={`progress-bar ${progressColor}`}
//                     role="progressbar"
//                     style={{ width: `${(val.score / maxScore) * 100}%` }}
//                     aria-valuenow={val.score}
//                     aria-valuemin="0"
//                     aria-valuemax={maxScore}
//                   ></div>
//                 </div>

//                 {val.comment && (
//                   <p className="mt-2 text-secondary mb-0">{val.comment}</p>
//                 )}
//                 <small className="text-muted">Turns Spent: {val.turns_spent}</small>
//               </div>
//             );
//           })}
//         </div>

//         {/* =============================== */}
//         {/* Pie Chart */}
//         {/* =============================== */}
//         <h4 className="fw-semibold mb-3">Category Turn Distribution</h4>
//         <div className="d-flex flex-column align-items-center mb-4">
//           <div style={{ width: 400, height: 400 }}>
//             <Pie data={pieData} options={pieOptions} />
//           </div>

//           {/* Legend */}
//           <ul className="list-unstyled mt-3" style={{ width: "100%", maxWidth: 300 }}>
//             {legendItems.map((item, idx) => (
//               <li
//                 key={idx}
//                 className="d-flex justify-content-between align-items-center mb-1"
//                 style={{ fontSize: 14 }}
//               >
//                 <div className="d-flex align-items-center">
//                   <span
//                     style={{
//                       display: "inline-block",
//                       width: 13,
//                       height: 13,
//                       backgroundColor: item.color,
//                       marginRight: 12,
//                       borderRadius: 2,
//                     }}
//                   />
//                   <span style={{ fontWeight: 500 }}>{item.label}</span>
//                 </div>
//                 <span style={{ fontWeight: 500, marginLeft: 20 }}>
//                   {item.percent}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <hr className="my-4" />

//         {/* =============================== */}
//         {/* Overall Summary */}
//         {/* =============================== */}
//         <h4 className="fw-semibold mb-3">Overall Summary</h4>
//         <div className="bg-light p-3 rounded">
//           <p>
//             <strong>Total Score:</strong> {overall_summary.total_score} /{" "}
//             {overall_summary.maximum_score}
//           </p>
//           <p>
//             <strong>Performance Level:</strong>{" "}
//             <span className="badge bg-secondary">
//               {overall_summary.performance_level}
//             </span>
//           </p>
//           <h6 className="fw-bold mt-3">Summary Comment</h6>
//           <p className="text-secondary" style={{ whiteSpace: "pre-wrap" }}>
//             {overall_summary.summary_comment}
//           </p>
//         </div>

//         <hr className="my-4" />

//         {/* =============================== */}
//         {/* Recommendations */}
//         {/* =============================== */}
//         <h4 className="fw-semibold mb-3">Recommendations</h4>
//         <ul className="list-group">
//           {recommendations.map((rec, idx) => (
//             <li key={idx} className="list-group-item">
//               {rec}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default EvaluationDisplay;
// import React from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register chart components
// ChartJS.register(ArcElement, Tooltip, Legend);

// // --- Pie chart plugin ---
// const pieLabelPlugin = {
//   id: "pieLabelPlugin",
//   afterDraw(chart) {
//     const { ctx } = chart;
//     const dataset = chart.data.datasets[0];
//     const total = dataset.data.reduce((a, b) => a + b, 0);

//     chart.getDatasetMeta(0).data.forEach((arc, i) => {
//       const value = dataset.data[i];
//       if (value === 0) return;
//       const percent = ((value / total) * 100).toFixed(0) + "%";
//       const { x, y } = arc.tooltipPosition();
//       ctx.save();
//       ctx.fillStyle = "white";
//       ctx.font = "bold 14px sans-serif";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText(percent, x, y);
//       ctx.restore();
//     });
//   },
// };

// ChartJS.register(pieLabelPlugin);

// const pieOptions = {
//   plugins: {
//     legend: { display: false },
//     tooltip: { enabled: true, position: "nearest" },
//   },
//   maintainAspectRatio: false,
// };

// const EvaluationDisplay = ({ entry }) => {
//   if (!entry?.response_json)
//     return <p>Response not available for turn {entry?.turn_index}</p>;

//   const {
//     conversation_context,
//     rubric_evaluation,
//     overall_summary,
//     recommendations,
//   } = entry.response_json;

//   const currentTurn = conversation_context.current_turn;

//   // Filter categories with at least 1 turn spent
//   const filteredEntries = Object.entries(rubric_evaluation).filter(
//     ([_, v]) => v.turns_spent > 0
//   );

//   const categories = filteredEntries.map(([cat]) => cat);
//   const turns = filteredEntries.map(([_, v]) => v.turns_spent);
//   const colors = [
//     "#36A2EB",
//     "#FF6384",
//     "#FFCE56",
//     "#4BC0C0",
//     "#9966FF",
//     "#FF9F40",
//   ].slice(0, turns.length);

//   const pieData = {
//     labels: categories,
//     datasets: [{ label: "Turns", data: turns, backgroundColor: colors }],
//   };

//   const totalTurns = turns.reduce((a, b) => a + b, 0);
//   const legendItems = categories.map((label, idx) => ({
//     label,
//     color: colors[idx],
//     percent: ((turns[idx] / totalTurns) * 100).toFixed(0) + "%",
//   }));

//   return (
//     <div className="card mb-5 shadow-sm border-0">
//       <div className="card-header bg-primary text-white py-3">
//         <h3 className="mb-0 fw-bold">Turn {entry.turn_index}</h3>
//       </div>

//       <div className="card-body">
//         {/* -------------------------------------------------- */}
//         {/* CURRENT TURN CONVERSATION */}
//         {/* -------------------------------------------------- */}

//         <h4 className="fw-semibold mb-3">Conversation</h4>

//         <div className="ps-3 mb-4">
//           <p className="mb-2">
//             <strong>Student:</strong>
//             <br />
//             <span className="text-secondary">{currentTurn.user_text}</span>
//           </p>

//           <p className="mb-0">
//             <strong>Patient:</strong>
//             <br />
//             <span className="text-secondary">
//               {currentTurn.assistant_text}
//             </span>
//           </p>
//         </div>

//         {/* Turn analysis */}
//         <h5 className="fw-semibold mt-4">Evaluation Notes</h5>
//         <p className="text-secondary">
//           {conversation_context.turn_analysis_summary}
//         </p>

//         <hr className="my-4" />

//         {/* -------------------------------------------------- */}
//         {/* RUBRIC EVALUATION */}
//         {/* -------------------------------------------------- */}

//         <h4 className="fw-semibold mb-3">Rubric Evaluation</h4>

//         <div className="mb-4">
//           {Object.entries(rubric_evaluation).map(([cat, val]) => {
//             const maxScore = val.max_score || 10;
//             let progressColor = "bg-success";
//             if (val.score < maxScore / 2) progressColor = "bg-danger";
//             else if (val.score < maxScore) progressColor = "bg-warning";

//             return (
//               <div key={cat} className="mb-3 p-3 border rounded shadow-sm">
//                 <div className="d-flex justify-content-between align-items-center mb-1">
//                   <strong>{cat}</strong>
//                   <span>
//                     {val.score} / {maxScore}
//                   </span>
//                 </div>

//                 <div className="progress" style={{ height: "20px" }}>
//                   <div
//                     className={`progress-bar ${progressColor}`}
//                     role="progressbar"
//                     style={{ width: `${(val.score / maxScore) * 100}%` }}
//                   ></div>
//                 </div>

//                 {val.comment && (
//                   <p className="mt-2 text-secondary mb-0">{val.comment}</p>
//                 )}

//                 <small className="text-muted">Turns Spent: {val.turns_spent}</small>
//               </div>
//             );
//           })}
//         </div>

//         {/* -------------------------------------------------- */}
//         {/* PIE CHART */}
//         {/* -------------------------------------------------- */}

//         <h4 className="fw-semibold mb-3">Category Turn Distribution</h4>

//         <div className="d-flex flex-column align-items-center mb-4">
//           <div style={{ width: 400, height: 400 }}>
//             <Pie data={pieData} options={pieOptions} />
//           </div>

//           <ul className="list-unstyled mt-3" style={{ width: "100%", maxWidth: 300 }}>
//             {legendItems.map((item, idx) => (
//               <li
//                 key={idx}
//                 className="d-flex justify-content-between align-items-center mb-1"
//                 style={{ fontSize: 14 }}
//               >
//                 <div className="d-flex align-items-center">
//                   <span
//                     style={{
//                       display: "inline-block",
//                       width: 13,
//                       height: 13,
//                       backgroundColor: item.color,
//                       marginRight: 12,
//                       borderRadius: 2,
//                     }}
//                   />
//                   <span style={{ fontWeight: 500 }}>{item.label}</span>
//                 </div>
//                 <span style={{ fontWeight: 500 }}>{item.percent}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <hr className="my-4" />

//         {/* -------------------------------------------------- */}
//         {/* OVERALL SUMMARY */}
//         {/* -------------------------------------------------- */}

//         <h4 className="fw-semibold mb-3">Overall Summary</h4>

//         <div className="bg-light p-3 rounded">
//           <p>
//             <strong>Total Score:</strong> {overall_summary.total_score} / {overall_summary.maximum_score}
//           </p>
//           <p>
//             <strong>Performance Level:</strong>{" "}
//             <span className="badge bg-secondary">
//               {overall_summary.performance_level}
//             </span>
//           </p>

//           <h6 className="fw-bold mt-3">Summary Comment</h6>
//           <p className="text-secondary" style={{ whiteSpace: "pre-wrap" }}>
//             {overall_summary.summary_comment}
//           </p>
//         </div>

//         <hr className="my-4" />

//         {/* -------------------------------------------------- */}
//         {/* RECOMMENDATIONS */}
//         {/* -------------------------------------------------- */}

//         <h4 className="fw-semibold mb-3">Recommendations</h4>

//         <ul className="list-group">
//           {recommendations.map((rec, idx) => (
//             <li key={idx} className="list-group-item">
//               {rec}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default EvaluationDisplay;
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Pie chart plugin
const pieLabelPlugin = {
  id: "pieLabelPlugin",
  afterDraw(chart) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];
    const total = dataset.data.reduce((a, b) => a + b, 0);

    chart.getDatasetMeta(0).data.forEach((arc, i) => {
      const value = dataset.data[i];
      if (value === 0) return;
      const percent = ((value / total) * 100).toFixed(0) + "%";
      const { x, y } = arc.tooltipPosition();
      ctx.save();
      ctx.fillStyle = "white";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(percent, x, y);
      ctx.restore();
    });
  },
};

ChartJS.register(pieLabelPlugin);

const pieOptions = {
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true, position: "nearest" },
  },
  maintainAspectRatio: false,
};

const EvaluationDisplay = ({ allEntries, currentTurnIndex }) => {
  if (!allEntries || allEntries.length === 0) {
    return <p>No data available. Provide `allEntries` as a non-empty array.</p>;
  }

  const currentEntry = allEntries.find(
    (e) => e.turn_index === currentTurnIndex
  );

  if (!currentEntry?.response_json) {
    return <p>Response not available for this turn.</p>;
  }

  const conversationHistory = allEntries.filter(
    (e) => e.turn_index < currentTurnIndex && e.response_json
  );

  const { conversation_context, rubric_evaluation, overall_summary, recommendations } =
    currentEntry.response_json;

  const currentTurn = conversation_context.current_turn;

  // ------------------------------
  // PIE CHART DATA
  // ------------------------------
  const filteredEntries = Object.entries(rubric_evaluation).filter(
    ([_, v]) => v.turns_spent > 0
  );

  const categories = filteredEntries.map(([cat]) => cat);
  const turns = filteredEntries.map(([_, v]) => v.turns_spent);

  const colors = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"].slice(
    0,
    turns.length
  );

  const pieData = {
    labels: categories,
    datasets: [{ label: "Turns", data: turns, backgroundColor: colors }],
  };

  const totalTurns = turns.reduce((a, b) => a + b, 0);
  const legendItems = categories.map((label, idx) => ({
    label,
    color: colors[idx],
    percent: ((turns[idx] / totalTurns) * 100).toFixed(0) + "%",
  }));

  return (
    <div className="card mb-5 shadow-sm border-0">
      <div className="card-header bg-primary text-white py-3">
        <h3 className="mb-0 fw-bold">Turn {currentTurnIndex}</h3>
      </div>

      <div className="card-body">
        {/* ================================================== */}
{/* FULL CONVERSATION HISTORY (scrollable) */}
{/* ================================================== */}
<h4 className="fw-semibold mb-3">Full Conversation History</h4>
<div
  className="mb-4 ps-3 border rounded p-2 bg-white"
  style={{ maxHeight: "400px", overflowY: "auto" }}
>
  {conversationHistory.map((entry) => {
    const turn = entry.response_json.conversation_context.current_turn;
    const summary = entry.response_json.conversation_context.turn_analysis_summary;

    return (
      <div
        key={entry.turn_index}
        className="border-bottom mb-3 pb-2"
      >
        <h6 className="fw-bold mb-1 text-primary">
          Turn {entry.turn_index}
        </h6>
        <p className="mb-1">
          <strong>Student:</strong>
          <br />
          <span className="text-secondary">{turn.user_text}</span>
        </p>
        <p className="mb-1">
          <strong>Patient:</strong>
          <br />
          <span className="text-secondary">{turn.assistant_text}</span>
        </p>
        <p className="small text-muted fst-italic">{summary}</p>
      </div>
    );
  })}
</div>


        {/* ================================================== */}
{/* CURRENT TURN */}
{/* ================================================== */}
<h4 className="fw-semibold mb-3">Current Turn</h4>
<div className="ps-3 mb-4 p-2 border rounded bg-white">
  <h6 className="fw-bold mb-1 text-primary">
    Turn {currentTurn.turn_index || currentTurnIndex}
  </h6>
  <p className="mb-1">
    <strong>Student:</strong>
    <br />
    <span className="text-secondary">{currentTurn.user_text}</span>
  </p>
  <p className="mb-0">
    <strong>Patient:</strong>
    <br />
    <span className="text-secondary">{currentTurn.assistant_text}</span>
  </p>
</div>


        {/* PIE CHART */}
        <h4 className="fw-semibold mb-3">Category Turn Distribution</h4>
        <div className="d-flex flex-column align-items-center mb-4">
          <div style={{ width: 400, height: 400 }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
          <ul className="list-unstyled mt-3" style={{ width: "100%", maxWidth: 300 }}>
            {legendItems.map((item, idx) => (
              <li
                key={idx}
                className="d-flex justify-content-between align-items-center mb-1"
                style={{ fontSize: 14 }}
              >
                <div className="d-flex align-items-center">
                  <span
                    style={{
                      display: "inline-block",
                      width: 13,
                      height: 13,
                      backgroundColor: item.color,
                      marginRight: 12,
                      borderRadius: 2,
                    }}
                  />
                  <span style={{ fontWeight: 500 }}>{item.label}</span>
                </div>
                <span style={{ fontWeight: 500 }}>{item.percent}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* OVERALL SUMMARY */}
        <hr className="my-4" />
        <h4 className="fw-semibold mb-3">Overall Summary</h4>
        <div className="bg-light p-3 rounded">
          <p>
            <strong>Total Score:</strong> {overall_summary.total_score} /{" "}
            {overall_summary.maximum_score}
          </p>
          <p>
            <strong>Performance Level:</strong>{" "}
            <span className="badge bg-secondary">{overall_summary.performance_level}</span>
          </p>
          <h6 className="fw-bold mt-3">Summary Comment</h6>
          <p className="text-secondary" style={{ whiteSpace: "pre-wrap" }}>
            {overall_summary.summary_comment}
          </p>
        </div>

        {/* RECOMMENDATIONS */}
        <hr className="my-4" />
        <h4 className="fw-semibold mb-3">Recommendations</h4>
        <ul className="list-group">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="list-group-item">{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EvaluationDisplay;
