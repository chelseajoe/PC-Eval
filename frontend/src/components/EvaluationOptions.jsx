// import React from "react";

// const EvaluationOptions = ({ options, selected, onChange }) => {
//   if (!options) return null;

//   return (
//     <div style={{ marginBottom: "15px" }}>
//       <label>
//         Model: 
//         <select value={selected.model} onChange={(e) => onChange("model", e.target.value)}>
//           {options.models.map((m) => <option key={m} value={m}>{m}</option>)}
//         </select>
//       </label>

//       <label style={{ marginLeft: "10px" }}>
//         Template: 
//         <select value={selected.template} onChange={(e) => onChange("template", e.target.value)}>
//           {options.templates.map((t) => <option key={t} value={t}>{t}</option>)}
//         </select>
//       </label>

//       <label style={{ marginLeft: "10px" }}>
//         User Conversation: 
//         <select value={selected.user_conversation} onChange={(e) => onChange("user_conversation", e.target.value)}>
//           {options.user_conversations.map((u) => <option key={u} value={u}>{u}</option>)}
//         </select>
//       </label>

//       <label style={{ marginLeft: "10px" }}>
//         Clinical Case: 
//         <select value={selected.clinical_case} onChange={(e) => onChange("clinical_case", e.target.value)}>
//           {options.clinical_cases.map((c) => <option key={c} value={c}>{c}</option>)}
//         </select>
//       </label>
//     </div>
//   );
// };

// export default EvaluationOptions;


import React from "react";

const EvaluationOptions = ({ options, selected, onChange }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label>
        Model:
        <select value={selected.model} onChange={(e) => onChange("model", e.target.value)}>
          {options.models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </label>

      <label>
        Template:
        <select value={selected.template} onChange={(e) => onChange("template", e.target.value)}>
          {options.templates.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>

      <label>
        User Conversation:
        <select value={selected.user_conversation} onChange={(e) => onChange("user_conversation", e.target.value)}>
          {options.user_conversations.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </label>

      <label>
        Clinical Case:
        <select value={selected.clinical_case} onChange={(e) => onChange("clinical_case", e.target.value)}>
          {options.clinical_cases.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default EvaluationOptions;
