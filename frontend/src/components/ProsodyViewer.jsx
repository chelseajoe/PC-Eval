// import React from "react";

// const ProsodyViewer = ({ entries }) => {
//   return (
//     <div className="d-flex flex-column gap-4">
//       {entries.map((entry, entryIdx) => {
//         const feedback =
//           entry?.prosody_evaluation?.utterance_level_feedback || [];

//         return (
//           <div key={entryIdx} className="d-flex flex-column gap-3">
//             {feedback.map((utt, i) => (
//               <div
//                 key={i}
//                 className="card shadow-sm rounded-4 p-4"
//                 style={{ backgroundColor: "#f8f9fa" }}
//               >
//                 {/* Turn Number */}
//                 <div className="mb-3">
//                   <h5 className="fw-bold text-primary">Turn {i + 1}</h5>
//                 </div>

//                 {/* Conversation Turn */}
//                 <div className="mb-3">
//                   <div className="mb-2">
//                     <span className="badge bg-primary me-2">User</span>
//                     {utt.conversation_turn?.user_text}
//                   </div>
//                   <div>
//                     <span className="badge bg-secondary me-2">Assistant</span>
//                     {utt.conversation_turn?.assistant_text}
//                   </div>
//                 </div>

//                 <div className="row mt-3">

//                   {/* What Worked Well */}
//                   <div className="col-md-6 mb-3">
//                     <div className="p-3 border rounded-3 h-100 bg-white shadow-sm">
//                       <h6 className="text-success fw-bold mb-3">
//                         What Worked Well
//                       </h6>
//                       {utt.what_worked_well?.length > 0 ? (
//                         utt.what_worked_well.map((item, idx) => (
//                           <div key={idx} className="mb-2">
//                             <div><strong>Tone:</strong> {item.tone}</div>
//                             <div><strong>Impact:</strong> {item.impact}</div>
//                             <div><strong>Adjustment:</strong> {item.adjustment}</div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-muted small">No strengths noted.</div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Needs Improvement */}
//                   <div className="col-md-6 mb-3">
//                     <div className="p-3 border rounded-3 h-100 bg-white shadow-sm">
//                       <h6 className="text-danger fw-bold mb-3">
//                         Needs Improvement
//                       </h6>
//                       {utt.what_needs_improvement?.length > 0 ? (
//                         utt.what_needs_improvement.map((item, idx) => (
//                           <div key={idx} className="mb-2">
//                             <div><strong>Tone:</strong> {item.tone}</div>
//                             <div><strong>Impact:</strong> {item.impact}</div>
//                             <div><strong>Adjustment:</strong> {item.adjustment}</div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-muted small">No issues noted.</div>
//                       )}
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProsodyViewer;

// import React, { useState } from "react";

// const summarize = (items) =>
//   items?.length ? items.map((i) => i.tone).join(", ") : "None noted";

// const ProsodyViewer = ({ entries }) => {
//   return (
//     <div className="d-flex flex-column gap-3">
//       {entries.map((entry, entryIdx) => {
//         const feedback =
//           entry?.prosody_evaluation?.utterance_level_feedback || [];

//         return feedback.map((utt, i) => {
//           const [open, setOpen] = useState(false);

//           return (
//             <div
//               key={`${entryIdx}-${i}`}
//               className="rounded-4 shadow-sm bg-white"
//             >
//               {/* Header */}
//               <button
//                 onClick={() => setOpen(!open)}
//                 className="w-100 text-start border-0 bg-transparent p-4 rounded-4"
//               >
//                 {/* Turn */}
//                 <div className="fw-semibold text-primary mb-3">
//                   Turn {i + 1}
//                 </div>

//                 {/* Conversation blocks */}
//                 <div className="mb-3">
//                   <div
//                     className="p-3 mb-2 rounded-3"
//                     style={{
//                       background: "#f1f5ff",
//                       borderLeft: "4px solid #0d6efd",
//                     }}
//                   >
//                     <div className="small text-muted fw-semibold mb-1">
//                       User
//                     </div>
//                     <div>{utt.conversation_turn?.user_text}</div>
//                   </div>

//                   <div
//                     className="p-3 rounded-3"
//                     style={{
//                       background: "#f8f9fa",
//                       borderLeft: "4px solid #6c757d",
//                     }}
//                   >
//                     <div className="small text-muted fw-semibold mb-1">
//                       Assistant
//                     </div>
//                     <div>{utt.conversation_turn?.assistant_text}</div>
//                   </div>
//                 </div>

//                 {/* Summary */}
//                 <div className="small">
//                   <div className="mb-1">
//                     <span className="text-success fw-semibold">
//                       Strengths:
//                     </span>{" "}
//                     {summarize(utt.what_worked_well)}
//                   </div>
//                   <div>
//                     <span className="text-danger fw-semibold">
//                       Improvements:
//                     </span>{" "}
//                     {summarize(utt.what_needs_improvement)}
//                   </div>
//                 </div>
//               </button>

//               {/* Expandable Content */}
//               {open && (
//                 <div className="border-top px-4 py-4 bg-light rounded-bottom-4">
//                   <div className="row g-4">
//                     {/* Strengths */}
//                     <div className="col-md-6">
//                       <h6 className="text-success fw-semibold mb-3">
//                         What Worked Well
//                       </h6>

//                       {utt.what_worked_well?.length ? (
//                         utt.what_worked_well.map((item, idx) => (
//                           <div key={idx} className="mb-3">
//                             <div className="small text-muted mb-1">
//                               Tone
//                             </div>
//                             <div className="mb-1">{item.tone}</div>

//                             <div className="small text-muted mb-1">
//                               Impact
//                             </div>
//                             <div className="mb-1">{item.impact}</div>

//                             <div className="small text-muted mb-1">
//                               Adjustment
//                             </div>
//                             <div className="fst-italic text-secondary">
//                               {item.adjustment}
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-muted small">
//                           No strengths noted.
//                         </div>
//                       )}
//                     </div>

//                     {/* Improvements */}
//                     <div className="col-md-6">
//                       <h6 className="text-danger fw-semibold mb-3">
//                         Needs Improvement
//                       </h6>

//                       {utt.what_needs_improvement?.length ? (
//                         utt.what_needs_improvement.map((item, idx) => (
//                           <div key={idx} className="mb-3">
//                             <div className="small text-muted mb-1">
//                               Tone
//                             </div>
//                             <div className="mb-1">{item.tone}</div>

//                             <div className="small text-muted mb-1">
//                               Impact
//                             </div>
//                             <div className="mb-1">{item.impact}</div>

//                             <div className="small text-muted mb-1">
//                               Adjustment
//                             </div>
//                             <div className="fst-italic text-secondary">
//                               {item.adjustment}
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-muted small">
//                           No issues noted.
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         });
//       })}
//     </div>
//   );
// };

// export default ProsodyViewer;


import React, { useState } from "react";

/* ---------- helpers ---------- */

const summarizeTones = (items) =>
  items?.length ? items.map((i) => i.tone).join(", ") : "None noted";

/* ---------- sub components ---------- */

const ConversationBlock = ({ label, text, bg, border }) => (
  <div
    className="p-3 rounded-3 mb-2"
    style={{ background: bg, borderLeft: `4px solid ${border}` }}
  >
    <div className="small fw-semibold text-muted mb-1">{label}</div>
    <div>{text}</div>
  </div>
);

const FeedbackList = ({ title, color, items, emptyText }) => (
  <div>
    <h6 className={`fw-semibold mb-3 text-${color}`}>{title}</h6>

    {items?.length ? (
      items.map((item, idx) => (
        <div key={idx} className="mb-3">
          <div className="small text-muted">Tone</div>
          <div className="mb-1">{item.tone}</div>

          <div className="small text-muted">Impact</div>
          <div className="mb-1">{item.impact}</div>

          <div className="small text-muted">Adjustment</div>
          <div className="fst-italic text-secondary">
            {item.adjustment}
          </div>
        </div>
      ))
    ) : (
      <div className="small text-muted">{emptyText}</div>
    )}
  </div>
);

/* ---------- main card ---------- */

const TurnCard = ({ turnIndex, utt }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-4 shadow-sm bg-white">
      {/* Header */}
      <button
        className="w-100 text-start border-0 bg-transparent p-4"
        onClick={() => setOpen(!open)}
      >
        {/* <div className="fw-semibold text-primary mb-3">
          Turn {turnIndex + 1}
        </div> */}

        <div className="d-flex justify-content-between align-items-center mb-3">
  <div className="fw-semibold text-primary">
    Turn {turnIndex + 1}
  </div>

  <div
    className="small text-muted d-flex align-items-center gap-1"
    aria-hidden
  >
    <span>{open ? "Hide details" : "View details"}</span>
    <span
      style={{
        display: "inline-block",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
      }}
    >
      ▾
    </span>
  </div>
</div>


        <ConversationBlock
          label="User"
          text={utt.conversation_turn?.user_text}
          bg="#f1f5ff"
          border="#0d6efd"
        />

        <ConversationBlock
          label="Assistant"
          text={utt.conversation_turn?.assistant_text}
          bg="#f8f9fa"
          border="#6c757d"
        />

        {/* Summary */}
        <div className="small mt-3">
          <div>
            <span className="fw-semibold text-success">Strengths:</span>{" "}
            {summarizeTones(utt.what_worked_well)}
          </div>
          <div>
            <span className="fw-semibold text-danger">Improvements:</span>{" "}
            {summarizeTones(utt.what_needs_improvement)}
          </div>
        </div>
      </button>

      {/* Expanded */}
      {open && (
        <div className="border-top bg-light px-4 py-4 rounded-bottom-4">
          <div className="row g-4">
            <div className="col-md-6">
              <FeedbackList
                title="What Worked Well"
                color="success"
                items={utt.what_worked_well}
                emptyText="No strengths noted."
              />
            </div>

            <div className="col-md-6">
              <FeedbackList
                title="Needs Improvement"
                color="danger"
                items={utt.what_needs_improvement}
                emptyText="No issues noted."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- viewer ---------- */

const ProsodyViewer = ({ entries }) => {
  return (
    <div className="d-flex flex-column gap-3">
      {entries.flatMap((entry, entryIdx) =>
        entry?.prosody_evaluation?.utterance_level_feedback?.map(
          (utt, i) => (
            <TurnCard
              key={`${entryIdx}-${i}`}
              turnIndex={i}
              utt={utt}
            />
          )
        )
      )}
    </div>
  );
};

export default ProsodyViewer;
