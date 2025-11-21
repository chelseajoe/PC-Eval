import React, { useEffect, useState } from "react";
import EvaluationDisplay from "../components/EvaluationDisplay";
import EvaluationOptions from "../components/EvaluationOptions";
import { fetchTurns, fetchOptions, runEvaluation } from "../services/api";
import EvaluationViewer from "../components/EvaluationViewer";

const TurnEvaluationPage = () => {
  const [turns, setTurns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  const [selected, setSelected] = useState({
    model: "gpt-5",
    template: "step_by_step_evaluation_prompt_v1.txt",
    user_conversation: "user_conversation.json",
    clinical_case: "clinical_case.json"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const turnsData = await fetchTurns();
        const opts = await fetchOptions();
        setTurns(turnsData);
        setOptions(opts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (key, value) => {
    setSelected({ ...selected, [key]: value });
  };

  const handleRunEvaluation = async () => {
    setLoading(true);
    try {
      const payload = {
        user_conversation_path: `demo_json_files/${selected.user_conversation}`,
        clinical_case_path: `demo_json_files/${selected.clinical_case}`,
        template_path: `prompts/templates/${selected.template}`,
        model: selected.model,
        index: 1
      };
      await runEvaluation(payload);
      const updatedTurns = await fetchTurns();
      setTurns(updatedTurns);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    // <div style={{ padding: "20px" }}>
    //   <h1>Clinical Turn Evaluations</h1>

    //   {options && (
    //     <>
    //       <EvaluationOptions options={options} selected={selected} onChange={handleSelectChange} />
    //       <button onClick={handleRunEvaluation}>Run Evaluation</button>
    //     </>
    //   )}

      // <div style={{ marginTop: "20px" }}>
      //   {turns.map((entry, idx) => (
      //     <EvaluationDisplay key={idx} entry={entry} />
      //   ))}
      // </div>
    // </div>
   <div style={{ marginTop: "20px" }}>
  <EvaluationViewer allEntries={turns} />
</div>

  );
};

export default TurnEvaluationPage;
