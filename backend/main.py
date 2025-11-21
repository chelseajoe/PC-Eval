from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import Optional
from pathlib import Path

# Import your evaluation function
from prompts.dynamic_turn_evaluation import run_dynamic_turn_evaluation

app = FastAPI()

# Allow frontend access
origins = ["http://localhost:3000"]  # React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to the results JSON
OUTPUT_JSON_PATH = Path("results/turn_evaluations_TEST.json")

@app.get("/turns")
def get_turns():
    """Return all turns from JSON if exists."""
    if OUTPUT_JSON_PATH.exists():
        with open(OUTPUT_JSON_PATH) as f:
            data = json.load(f)
        return data
    return {"error": "Evaluation file not found."}

@app.get("/turn/{turn_index}")
def get_turn(turn_index: int):
    """Return one turn by index."""
    if OUTPUT_JSON_PATH.exists():
        with open(OUTPUT_JSON_PATH) as f:
            data = json.load(f)
        turn = next((t for t in data if t["turn_index"] == turn_index), None)
        if turn:
            return turn
        return {"error": "Turn not found"}
    return {"error": "Evaluation file not found."}

@app.post("/run-evaluation")
def run_evaluation(
    user_conversation_path: str = "demo_json_files/user_conversation.json",
    clinical_case_path: str = "demo_json_files/clinical_case.json",
    configuration_path: str = "demo_json_files/configuration.json",
    template_path: str = "prompts/templates/step_by_step_evaluation_prompt_v1.txt",
    model: str = "gpt-5",
    index: int = 1
):
    """Run dynamic evaluation and save output JSON."""
    run_dynamic_turn_evaluation(
        user_conversation_path=user_conversation_path,
        clinical_case_path=clinical_case_path,
        configuration_path=configuration_path,
        template_path=template_path,
        output_path=str(OUTPUT_JSON_PATH),
        model=model,
        index=index
    )
    return {"status": "success", "output_path": str(OUTPUT_JSON_PATH)}

# Path to your JSON file
OUTPUT_JSON_PATH = Path("../results/turn_evaluations_TEST.json")

@app.get("/json")
def get_json():
    if OUTPUT_JSON_PATH.exists():
        with open(OUTPUT_JSON_PATH) as f:
            data = json.load(f)  # this must be a list
        return data
    return {"error": "File not found"}