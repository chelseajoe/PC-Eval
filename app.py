import streamlit as st
import json
import pandas as pd
import matplotlib.pyplot as plt

st.set_page_config(layout="wide")

# ---- Load JSON from path ----
@st.cache_data
def load_json(path):
    with open(path, "r") as f:
        return json.load(f)

# Set path here
JSON_PATH = "results/turn_evaluations_TEST.json"
data = load_json(JSON_PATH)

st.title("LLM Clinical Interview Evaluation Viewer")

# Sidebar turn selector
turn_indices = [entry["turn_index"] for entry in data]
selected_turn = st.sidebar.selectbox("Select Turn", turn_indices)

# Retrieve entry for selected turn
entry = next(e for e in data if e["turn_index"] == selected_turn)
response = entry["response_json"]

# ---- Turn Header ----
st.header(f"Turn {selected_turn}")

# ---- Conversation Context ----
st.subheader("Conversation Context")
st.write("**Student:**", response["conversation_context"]["current_turn"]["user_text"])
st.write("**Patient:**", response["conversation_context"]["current_turn"]["assistant_text"])

# ---- Summary of Conversation ----
st.subheader("Summary of Conversation")
st.write(response["conversation_context"]["summary_of_full_conversation"])

# ---- Rubric Evaluation Table ----
st.subheader("Rubric Evaluation")
rubric_eval = response["rubric_evaluation"]

rubric_rows = []
for category, values in rubric_eval.items():
    rubric_rows.append({
        "Rubric Category": category,
        "Score": values["score"],
        "Binary Score": values["binary_score"],
        "Turns Spent": values["turns_spent"],
        "Comment": values["comment"]
    })

df_rubric = pd.DataFrame(rubric_rows)
st.dataframe(df_rubric, use_container_width=True)

# ---- Pie Chart: Score Percent Distribution by Category ----
st.subheader("Score Distribution by Category (Pie Chart)")
scores = df_rubric.set_index("Rubric Category")["Score"]

fig, ax = plt.subplots()
ax.pie(scores, labels=scores.index, autopct="%1.1f%%")
ax.axis("equal")
st.pyplot(fig)

# ---- Overall Summary ----
st.subheader("Overall Summary")
st.json(response["overall_summary"])

# ---- Score Progression Line Chart ----
st.subheader("Score Progression Over Time")
progress_rows = []
for e in data:
    summary = e["response_json"]["overall_summary"]
    progress_rows.append({
        "turn_index": e["turn_index"],
        "total_score": int(summary["total_score"])
    })
progress_df = pd.DataFrame(progress_rows)
st.line_chart(progress_df.set_index("turn_index"))

# ---- Turn-by-Turn Score Table ----
st.subheader("Turn-by-Turn Score Breakdown")
turn_scores = []

for e in data:
    row = {"Turn": e["turn_index"]}
    for cat, vals in e["response_json"]["rubric_evaluation"].items():
        row[cat] = vals["score"]
    turn_scores.append(row)

scores_df = pd.DataFrame(turn_scores).set_index("Turn")
st.dataframe(scores_df, use_container_width=True)

# ---- Aggregate Category Pie Chart ----
st.subheader("Aggregate Score Contribution by Category (All Turns Combined)")
category_totals = scores_df.sum()

fig2, ax2 = plt.subplots()
ax2.pie(category_totals, labels=category_totals.index, autopct="%1.1f%%")
ax2.axis("equal")
st.pyplot(fig2)

# ---- Rubric Updates ----
st.subheader("Rubric Updates")
st.json(response["rubric_update_explanation"])

# ---- Recommendations ----
st.subheader("Recommendations")
for rec in response["recommendations"]:
    st.markdown(f"- {rec}")
