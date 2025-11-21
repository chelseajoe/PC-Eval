// // import React from "react";

// // const EvaluationDisplay = ({ entry }) => {
// //   if (!entry) return null;

// //   const { turn_index, response_json } = entry;
// //   const { conversation_context, rubric_evaluation, overall_summary, recommendations } = response_json;

// //   return (
// //     <div style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px", borderRadius: "5px" }}>
// //       <h2>Turn {turn_index}</h2>

// //       <h3>Conversation</h3>
// //       <p><strong>Student:</strong> {conversation_context.current_turn.user_text}</p>
// //       <p><strong>Patient:</strong> {conversation_context.current_turn.assistant_text}</p>

// //       <h3>Summary</h3>
// //       <p>{conversation_context.summary_of_full_conversation}</p>

// //       <h3>Rubric Evaluation</h3>
// //       <ul>
// //         {Object.entries(rubric_evaluation).map(([cat, val]) => (
// //           <li key={cat}>
// //             <strong>{cat}</strong>: Score {val.score}, Turns {val.turns_spent}, Comment: {val.comment}
// //           </li>
// //         ))}
// //       </ul>

// //       <h3>Overall Summary</h3>
// //       <pre>{JSON.stringify(overall_summary, null, 2)}</pre>

// //       <h3>Recommendations</h3>
// //       <ul>
// //         {recommendations.map((rec, idx) => (
// //           <li key={idx}>{rec}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default EvaluationDisplay;


// import React from "react";

// const EvaluationDisplay = ({ entry }) => {
//   const response = entry.response_json;

//   if (!response) {
//     return <p>Response not available for turn {entry.turn_index}</p>;
//   }

//   const { conversation_context, rubric_evaluation, overall_summary, recommendations } = response;

//   return (
//     <div style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px", borderRadius: "5px" }}>
//       <h2>Turn {entry.turn_index}</h2>

//       <h3>Conversation</h3>
//       <p><strong>Student:</strong> {conversation_context.current_turn.user_text}</p>
//       <p><strong>Patient:</strong> {conversation_context.current_turn.assistant_text}</p>

//       <h3>Summary</h3>
//       <p>{conversation_context.summary_of_full_conversation}</p>

//       <h3>Rubric Evaluation</h3>
//       <ul>
//         {Object.entries(rubric_evaluation).map(([cat, val]) => (
//           <li key={cat}>
//             <strong>{cat}</strong>: Score {val.score}, Turns {val.turns_spent}, Comment: {val.comment}
//           </li>
//         ))}
//       </ul>

//       <h3>Overall Summary</h3>
//       <pre>{JSON.stringify(overall_summary, null, 2)}</pre>

//       <h3>Recommendations</h3>
//       <ul>
//         {recommendations.map((rec, idx) => (
//           <li key={idx}>{rec}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default EvaluationDisplay;

import React from "react";

const EvaluationDisplay = ({ entry }) => {
  if (!entry?.response_json) {
    return <p>Response not available for turn {entry?.turn_index}</p>;
  }

  const { conversation_context, rubric_evaluation, overall_summary, recommendations } = entry.response_json;

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px", borderRadius: "5px" }}>
      <h2>Turn {entry.turn_index}</h2>

      <h3>Conversation</h3>
      <p><strong>Student:</strong> {conversation_context.current_turn.user_text}</p>
      <p><strong>Patient:</strong> {conversation_context.current_turn.assistant_text}</p>

      <h3>Summary</h3>
      <p>{conversation_context.summary_of_full_conversation}</p>

      <h3>Rubric Evaluation</h3>
      <ul>
        {Object.entries(rubric_evaluation).map(([cat, val]) => (
          <li key={cat}>
            <strong>{cat}</strong>: Score {val.score}, Turns {val.turns_spent}, Comment: {val.comment}
          </li>
        ))}
      </ul>

      <h3>Overall Summary</h3>
      <pre>{JSON.stringify(overall_summary, null, 2)}</pre>

      <h3>Recommendations</h3>
      <ul>
        {recommendations.map((rec, idx) => (
          <li key={idx}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default EvaluationDisplay;
