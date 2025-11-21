
// import React from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const EvaluationDisplay = ({ entry }) => {
//   if (!entry?.response_json) {
//     return <p>Response not available for turn {entry?.turn_index}</p>;
//   }

//   const { conversation_context, rubric_evaluation, overall_summary, recommendations } =
//     entry.response_json;

//   // Prepare data for Pie chart
//   const categories = Object.keys(rubric_evaluation);
//   const scores = Object.values(rubric_evaluation).map((v) => v.score);
//   const pieData = {
//     labels: categories,
//     datasets: [
//       {
//         label: "Scores",
//         data: scores,
//         backgroundColor: [
//           "#36A2EB",
//           "#FF6384",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#FF9F40",
//         ],
//       },
//     ],
//   };

//   return (
//     <div className="card mb-4 shadow-sm">
//       <div className="card-header bg-primary text-white">
//         <h4 className="mb-0">Turn {entry.turn_index}</h4>
//       </div>
//       <div className="card-body">
//         {/* Conversation */}
//         <h5 className="card-title">Conversation</h5>
//         <p>
//           <strong>Student:</strong> {conversation_context.current_turn.user_text}
//         </p>
//         <p>
//           <strong>Patient:</strong> {conversation_context.current_turn.assistant_text}
//         </p>

//         <h6 className="mt-3">Full Conversation Summary</h6>
//         <p>{conversation_context.summary_of_full_conversation}</p>

//         {/* Rubric Table */}
//         <h5 className="mt-4">Rubric Evaluation</h5>
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>Category</th>
//                 <th>Score</th>
//                 <th>Turns Spent</th>
//                 <th>Comment</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(rubric_evaluation).map(([cat, val]) => (
//                 <tr key={cat}>
//                   <td>{cat}</td>
//                   <td>{val.score}</td>
//                   <td>{val.turns_spent}</td>
//                   <td>{val.comment}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pie Chart */}
//         <h5 className="mt-4">Category Score Distribution</h5>
//         <div style={{ maxWidth: "400px", margin: "auto" }}>
//           <Pie data={pieData} />
//         </div>

//         {/* Overall Summary */}
//         <h5 className="mt-4">Overall Summary</h5>
//         <pre className="bg-light p-3 rounded">{JSON.stringify(overall_summary, null, 2)}</pre>

//         {/* Recommendations */}
//         <h5 className="mt-4">Recommendations</h5>
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

// ChartJS.register(ArcElement, Tooltip, Legend);

// const EvaluationDisplay = ({ entry }) => {
//   if (!entry?.response_json) {
//     return <p>Response not available for turn {entry?.turn_index}</p>;
//   }

//   const { conversation_context, rubric_evaluation, overall_summary, recommendations } =
//     entry.response_json;

//   // Pie chart data
//   const categories = Object.keys(rubric_evaluation);
//   const scores = Object.values(rubric_evaluation).map((v) => v.score);
//   const pieData = {
//     labels: categories,
//     datasets: [
//       {
//         label: "Scores",
//         data: scores,
//         backgroundColor: [
//           "#36A2EB",
//           "#FF6384",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#FF9F40",
//         ],
//       },
//     ],
//   };

//   return (
//     <div className="card mb-5 shadow-sm border-0">
//       {/* Header */}
//       <div className="card-header bg-primary text-white py-3">
//         <h3 className="mb-0 fw-bold">Turn {entry.turn_index}</h3>
//       </div>

//       <div className="card-body">

//         {/* Conversation Section */}
//         <h4 className="fw-semibold mb-3">Conversation</h4>

//         <div className="ps-3 mb-4">
//           <p className="mb-2">
//             <strong className="text-dark">Student:</strong><br />
//             <span className="text-secondary">{conversation_context.current_turn.user_text}</span>
//           </p>

//           <p className="mb-0">
//             <strong className="text-dark">Patient:</strong><br />
//             <span className="text-secondary">{conversation_context.current_turn.assistant_text}</span>
//           </p>
//         </div>

//         <h5 className="fw-semibold mt-4">Conversation Summary</h5>
//         <p className="text-secondary">{conversation_context.summary_of_full_conversation}</p>

//         <hr className="my-4" />

//         {/* Rubric Section */}
//         <h4 className="fw-semibold mb-3">Rubric Evaluation</h4>

//         <div className="table-responsive mb-4">
//           <table className="table table-bordered align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>Category</th>
//                 <th>Score</th>
//                 <th>Turns Spent</th>
//                 <th>Comment</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(rubric_evaluation).map(([cat, val]) => (
//                 <tr key={cat}>
//                   <td className="fw-medium">{cat}</td>
//                   <td>{val.score}</td>
//                   <td>{val.turns_spent}</td>
//                   <td className="text-secondary">{val.comment}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pie Chart */}
//         <h4 className="fw-semibold mb-3">Category Score Distribution</h4>

//         <div className="d-flex justify-content-center mb-4">
//           <div style={{ width: "500px", height: "500px" }}>
//             <Pie data={pieData} />
//           </div>
//         </div>

//         <hr className="my-4" />

//         {/* Overall Summary */}
//         <h4 className="fw-semibold mb-3">Overall Summary</h4>
//         <pre className="bg-light p-3 rounded" style={{ whiteSpace: "pre-wrap" }}>
//           {JSON.stringify(overall_summary, null, 2)}
//         </pre>

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

import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

// === Percent Label Plugin for Pie Chart ===
const pieLabelPlugin = {
  id: "pieLabelPlugin",
  afterDraw(chart) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];
    const total = dataset.data.reduce((a, b) => a + b, 0);

    chart.getDatasetMeta(0).data.forEach((arc, i) => {
      const value = dataset.data[i];
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
    legend: {
      position: "bottom",
      labels: {
        font: { size: 14 },
      },
    },
  },
  maintainAspectRatio: false,
};

const EvaluationDisplay = ({ entry }) => {
  if (!entry?.response_json) {
    return <p>Response not available for turn {entry?.turn_index}</p>;
  }

  const { conversation_context, rubric_evaluation, overall_summary, recommendations } =
    entry.response_json;

  // ==== PIE CHART DATA ====
  // Remove categories with a score of 0
const filteredEntries = Object.entries(rubric_evaluation).filter(
  ([_, v]) => v.score > 0
);

const categories = filteredEntries.map(([cat]) => cat);
const scores = filteredEntries.map(([_, v]) => v.score);

const pieData = {
  labels: categories,
  datasets: [
    {
      label: "Scores",
      data: scores,
      backgroundColor: [
        "#36A2EB",
        "#FF6384",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ].slice(0, scores.length) // trim colors to match # of items
    },
  ],
};

  return (
    <div className="card mb-5 shadow-sm border-0">
      {/* HEADER */}
      <div className="card-header bg-primary text-white py-3">
        <h3 className="mb-0 fw-bold">Turn {entry.turn_index}</h3>
      </div>

      <div className="card-body">
        {/* =========================
            CONVERSATION SECTION
        ========================== */}
        <h4 className="fw-semibold mb-3">Conversation</h4>

        <div className="ps-3 mb-4">
          <p className="mb-2">
            <strong>Student:</strong><br />
            <span className="text-secondary">
              {conversation_context.current_turn.user_text}
            </span>
          </p>

          <p className="mb-0">
            <strong>Patient:</strong><br />
            <span className="text-secondary">
              {conversation_context.current_turn.assistant_text}
            </span>
          </p>
        </div>

        <h5 className="fw-semibold mt-4">Conversation Summary</h5>
        <p className="text-secondary">
          {conversation_context.summary_of_full_conversation}
        </p>

        <hr className="my-4" />

        {/* =========================
            RUBRIC TABLE
        ========================== */}
        <h4 className="fw-semibold mb-3">Rubric Evaluation</h4>

        <div className="table-responsive mb-4">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Category</th>
                <th>Score</th>
                <th>Turns Spent</th>
                <th>Comment</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(rubric_evaluation).map(([cat, val]) => (
                <tr key={cat}>
                  <td className="fw-medium">{cat}</td>
                  <td>{val.score}</td>
                  <td>{val.turns_spent}</td>
                  <td className="text-secondary">{val.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* =========================
            PIE CHART
        ========================== */}
        <h4 className="fw-semibold mb-3">Category Score Distribution</h4>

        <div className="d-flex justify-content-center mb-4">
          <div style={{ width: "520px", height: "520px" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <hr className="my-4" />

        {/* =========================
            OVERALL SUMMARY (PARSED)
        ========================== */}
        <h4 className="fw-semibold mb-3">Overall Summary</h4>

        <div className="bg-light p-3 rounded">

          <p>
            <strong>Total Score:</strong> {overall_summary.total_score} /{" "}
            {overall_summary.maximum_score}
          </p>

          <p>
            <strong>Performance Level:</strong>{" "}
            <span className="badge bg-secondary">
              {overall_summary.performance_level}
            </span>
          </p>

          <h6 className="fw-bold mt-3">Summary Comment</h6>
          <p className="text-secondary" style={{ whiteSpace: "pre-wrap" }}>
            {overall_summary.summary_comment}
          </p>
        </div>

        <hr className="my-4" />

        {/* =========================
            RECOMMENDATIONS
        ========================== */}
        <h4 className="fw-semibold mb-3">Recommendations</h4>

        <ul className="list-group">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="list-group-item">
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EvaluationDisplay;
