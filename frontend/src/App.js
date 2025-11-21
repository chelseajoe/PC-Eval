import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the entire JSON from backend
    axios.get("http://127.0.0.1:8000/json")
      .then(res => {
        setJsonData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching JSON:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading JSON...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error loading JSON. Check console for details.</p>;
  }

  if (!jsonData || jsonData.length === 0) {
    return <p>No data found in JSON.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Turn Evaluations</h1>
      {jsonData.map((entry, i) => (
        <div key={i} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px", borderRadius: "5px" }}>
          <h2>Turn {entry.turn_index}</h2>

          <h3>Conversation</h3>
          <p><strong>Student:</strong> {entry.response_json.conversation_context.current_turn.user_text}</p>
          <p><strong>Patient:</strong> {entry.response_json.conversation_context.current_turn.assistant_text}</p>

          <h3>Summary</h3>
          <p>{entry.response_json.conversation_context.summary_of_full_conversation}</p>

          <h3>Rubric Evaluation</h3>
          <ul>
            {Object.entries(entry.response_json.rubric_evaluation).map(([cat, val]) => (
              <li key={cat}>
                <strong>{cat}</strong>: Score {val.score}, Turns {val.turns_spent}, Comment: {val.comment}
              </li>
            ))}
          </ul>

          <h3>Overall Summary</h3>
          <pre>{JSON.stringify(entry.response_json.overall_summary, null, 2)}</pre>

          <h3>Recommendations</h3>
          <ul>
            {entry.response_json.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
