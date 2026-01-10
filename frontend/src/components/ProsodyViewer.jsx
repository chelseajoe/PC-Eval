import React, { useState } from "react";


const summarizeTones = (items) =>
  items?.length ? items.map((i) => i.tone).join(", ") : "None noted";


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
          label="Student"
          text={utt.conversation_turn?.user_text}
          bg="#f1f5ff"
          border="#0d6efd"
        />

        <ConversationBlock
          label="Patient"
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
