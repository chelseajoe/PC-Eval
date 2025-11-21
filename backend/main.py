# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# import json
# from typing import Optional
# from pathlib import Path

# # Import your evaluation function
# from prompts.dynamic_turn_evaluation import run_dynamic_turn_evaluation

# app = FastAPI()

# # Allow frontend access
# origins = [
#     "http://localhost:5174",  # Vite dev server
#     "http://127.0.0.1:5174",  # optional
#     "http://localhost:3000",  # if you use CRA in another setup
# ]  
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # Path to the results JSON
# OUTPUT_JSON_PATH = Path("results/turn_evaluations_TEST.json")

# @app.get("/turns")
# def get_turns():
#     """Return all turns from JSON if exists."""
#     if OUTPUT_JSON_PATH.exists():
#         with open(OUTPUT_JSON_PATH) as f:
#             data = json.load(f)
#         return data
#     return {"error": "Evaluation file not found."}

# @app.get("/turn/{turn_index}")
# def get_turn(turn_index: int):
#     """Return one turn by index."""
#     if OUTPUT_JSON_PATH.exists():
#         with open(OUTPUT_JSON_PATH) as f:
#             data = json.load(f)
#         turn = next((t for t in data if t["turn_index"] == turn_index), None)
#         if turn:
#             return turn
#         return {"error": "Turn not found"}
#     return {"error": "Evaluation file not found."}

# @app.post("/run-evaluation")
# def run_evaluation(
#     user_conversation_path: str = "demo_json_files/user_conversation.json",
#     clinical_case_path: str = "demo_json_files/clinical_case.json",
#     configuration_path: str = "demo_json_files/configuration.json",
#     template_path: str = "prompts/templates/step_by_step_evaluation_prompt_v1.txt",
#     model: str = "gpt-5",
#     index: int = 1
# ):
#     """Run dynamic evaluation and save output JSON."""
#     run_dynamic_turn_evaluation(
#         user_conversation_path=user_conversation_path,
#         clinical_case_path=clinical_case_path,
#         configuration_path=configuration_path,
#         template_path=template_path,
#         output_path=str(OUTPUT_JSON_PATH),
#         model=model,
#         index=index
#     )
#     return {"status": "success", "output_path": str(OUTPUT_JSON_PATH)}

# # Path to your JSON file
# OUTPUT_JSON_PATH = Path("../results/new_turn_evaluations_TEST.json")

# @app.get("/json")
# def get_json():
#     if OUTPUT_JSON_PATH.exists():
#         with open(OUTPUT_JSON_PATH) as f:
#             data = json.load(f)  # this must be a list
#         return data
#     return {"error": "File not found"}


# # Paths
# OUTPUT_JSON_PATH = Path("../results/new_turn_evaluations_TEST.json")
# USER_CONVERSATION_DIR = Path("demo_json_files")
# CLINICAL_CASE_DIR = Path("demo_json_files")
# TEMPLATE_DIR = Path("prompts/templates")

# @app.get("/options")
# def get_options():
#     """Return available files/options for dropdowns."""
#     user_conversations = [f.name for f in USER_CONVERSATION_DIR.glob("*.json")]
#     clinical_cases = [f.name for f in CLINICAL_CASE_DIR.glob("*.json")]
#     templates = [f.name for f in TEMPLATE_DIR.glob("*.txt")]

#     # Models could also be configurable
#     models = ["gpt-5", "gpt-4"]

#     return {
#         "user_conversations": user_conversations,
#         "clinical_cases": clinical_cases,
#         "templates": templates,
#         "models": models
#     }


# --------------------------
# Imports
# --------------------------
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import Optional
from pathlib import Path

# Your evaluation functions
from prompts.dynamic_turn_evaluation import (
    run_dynamic_turn_evaluation,
    run_full_evaluation
)

# --------------------------
# FastAPI setup
# --------------------------
app = FastAPI()

origins = [
    "http://localhost:5174",  # Vite
    "http://127.0.0.1:5174",
    "http://localhost:3000",  # CRA
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------
# Paths
# --------------------------
OUTPUT_JSON_PATH = Path("../results/new_turn_evaluations_TEST.json")
FINAL_OUTPUT_JSON_PATH = Path("../results/final_evaluation_TEST.json")

USER_CONVERSATION_DIR = Path("demo_json_files")
CLINICAL_CASE_DIR = Path("demo_json_files")
TEMPLATE_DIR = Path("prompts/templates")

# --------------------------
# 1. Get all turns
# --------------------------
@app.get("/turns")
def get_turns():
    if OUTPUT_JSON_PATH.exists():
        with open(OUTPUT_JSON_PATH) as f:
            return json.load(f)
    return {"error": "Evaluation file not found."}

# --------------------------
# 2. Get single turn
# --------------------------
@app.get("/turn/{turn_index}")
def get_turn(turn_index: int):
    if not OUTPUT_JSON_PATH.exists():
        return {"error": "Evaluation file not found."}

    with open(OUTPUT_JSON_PATH) as f:
        data = json.load(f)

    turn = next((t for t in data if t["turn_index"] == turn_index), None)
    return turn if turn else {"error": "Turn not found"}

# --------------------------
# 3. Raw JSON fetch
# --------------------------
@app.get("/json")
def get_json():
    if OUTPUT_JSON_PATH.exists():
        with open(OUTPUT_JSON_PATH) as f:
            return json.load(f)
    return {"error": "File not found"}

# --------------------------
# 4. Options for dropdowns
# --------------------------
@app.get("/options")
def get_options():
    user_conversations = [f.name for f in USER_CONVERSATION_DIR.glob("*.json")]
    clinical_cases = [f.name for f in CLINICAL_CASE_DIR.glob("*.json")]
    templates = [f.name for f in TEMPLATE_DIR.glob("*.txt")]
    models = ["gpt-5", "gpt-4"]

    return {
        "user_conversations": user_conversations,
        "clinical_cases": clinical_cases,
        "templates": templates,
        "models": models,
    }

# --------------------------
# 5. Run evaluation (turn-by-turn)
# --------------------------
@app.post("/run-evaluation")
def run_evaluation(
    user_conversation_path: str = "demo_json_files/user_conversation.json",
    clinical_case_path: str = "demo_json_files/clinical_case.json",
    configuration_path: str = "demo_json_files/configuration.json",
    template_path: str = "prompts/templates/step_by_step_evaluation_prompt_v1.txt",
    model: str = "gpt-5",
    index: Optional[int] = None
):
    """Runs the per-turn evaluation and writes JSON."""
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

# --------------------------
# 6. Run full evaluation (turn + final summary)
# --------------------------
@app.post("/run-full-evaluation")
def run_full_eval():
    """Uses your full evaluation function."""
    turn_results, final_results = run_full_evaluation(
        user_conversation_path="demo_json_files/user_conversation.json",
        clinical_case_path="demo_json_files/clinical_case.json",
        configuration_path="demo_json_files/configuration.json",
        template_path="prompts/templates/step_by_step_evaluation_prompt_v1.txt",
        turn_eval_output=str(OUTPUT_JSON_PATH),
        final_eval_output=str(FINAL_OUTPUT_JSON_PATH),
        model="gpt-5",
        index=None,
        final_prompt_path="prompts/templates/final_evaluation_prompt.txt"
    )

    return {
        "status": "success",
        "turn_eval_output": str(OUTPUT_JSON_PATH),
        "final_eval_output": str(FINAL_OUTPUT_JSON_PATH),
    }
