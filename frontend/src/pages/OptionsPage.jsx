import React, { useEffect, useState } from "react";
import EvaluationOptions from "../components/EvaluationOptions";
import { fetchOptions } from "../services/api";

const OptionsPage = () => {
  const [options, setOptions] = useState(null);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const loadOptions = async () => {
      const opts = await fetchOptions();
      setOptions(opts);
      setSelected({
        model: opts.models[0],
        template: opts.templates[0],
        user_conversation: opts.user_conversations[0],
        clinical_case: opts.clinical_cases[0]
      });
    };
    loadOptions();
  }, []);

  if (!options) return <p>Loading options...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Evaluation Options</h1>
      <EvaluationOptions options={options} selected={selected} onChange={(k,v)=>setSelected({...selected,[k]:v})} />
      <pre>{JSON.stringify(selected, null, 2)}</pre>
    </div>
  );
};

export default OptionsPage;
