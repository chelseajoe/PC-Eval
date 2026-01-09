// import React from "react";

// const ProsodyViewer = ({ entries }) => {
//   return (
//     <div className="d-flex flex-column gap-4">
//       {entries.map((entry, entryIdx) => {
//         const feedback =
//           entry?.prosody_evaluation?.utterance_level_feedback || [];

//         return (
//           <div key={entryIdx} className="card shadow-sm rounded-4">
//             <div className="card-header bg-white fw-bold">
//               Entry {entry.entry_index}
//             </div>

//             <div className="card-body d-flex flex-column gap-4">
//               {feedback.map((utt, i) => (
//                 <div key={i} className="border rounded-3 p-3 bg-light">

//                   {/* Quote */}
//                   <blockquote className="blockquote mb-3">
//                     <p className="mb-0 fst-italic">“{utt.quote}”</p>
//                   </blockquote>

//                   <div className="row">

//                     {/* What worked well */}
//                     <div className="col-md-6">
//                       <h6 className="text-success fw-bold mb-2">
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

//                     {/* What needs improvement */}
//                     <div className="col-md-6">
//                       <h6 className="text-danger fw-bold mb-2">
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
//               ))}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProsodyViewer;


import React from "react";

const ProsodyViewer = ({ entries }) => {
  return (
    <div className="d-flex flex-column gap-4">
      {entries.map((entry, entryIdx) => {
        const feedback =
          entry?.prosody_evaluation?.utterance_level_feedback || [];

        return (
          <div key={entryIdx} className="card shadow-sm rounded-4">
            <div className="card-header bg-white fw-bold">
              Entry {entry.entry_index}
            </div>

            <div className="card-body d-flex flex-column gap-4">
              {feedback.map((utt, i) => (
                <div key={i} className="border rounded-3 p-3 bg-light">

                  {/* Conversation Turn */}
                  <div className="mb-3">
                    <div><strong>User:</strong> {utt.conversation_turn?.user_text}</div>
                    <div><strong>Assistant:</strong> {utt.conversation_turn?.assistant_text}</div>
                  </div>

                  <div className="row">

                    {/* What worked well */}
                    <div className="col-md-6">
                      <h6 className="text-success fw-bold mb-2">
                        What Worked Well
                      </h6>
                      {utt.what_worked_well?.length > 0 ? (
                        utt.what_worked_well.map((item, idx) => (
                          <div key={idx} className="mb-2">
                            <div><strong>Tone:</strong> {item.tone}</div>
                            <div><strong>Impact:</strong> {item.impact}</div>
                            <div><strong>Adjustment:</strong> {item.adjustment}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-muted small">No strengths noted.</div>
                      )}
                    </div>

                    {/* What needs improvement */}
                    <div className="col-md-6">
                      <h6 className="text-danger fw-bold mb-2">
                        Needs Improvement
                      </h6>
                      {utt.what_needs_improvement?.length > 0 ? (
                        utt.what_needs_improvement.map((item, idx) => (
                          <div key={idx} className="mb-2">
                            <div><strong>Tone:</strong> {item.tone}</div>
                            <div><strong>Impact:</strong> {item.impact}</div>
                            <div><strong>Adjustment:</strong> {item.adjustment}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-muted small">No issues noted.</div>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProsodyViewer;
