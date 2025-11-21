import json
import openai

# -----------------------------
# Load a JSON file
# -----------------------------
def load_json(path):
    with open(path, "r") as f:
        return json.load(f)


def parse_transcript_into_turns(raw_transcript):
    """
    Converts raw transcript (JSON string or list) into conversation turns
    pairing user + assistant together.
    
    Output format:
    [
        {
            "user_text": "...",
            "user_emotions": [...],
            "assistant_text": "...",
            "assistant_emotions": [...]
        },
        ...
    ]
    """

    # Step 1: Ensure we have a list
    if isinstance(raw_transcript, str):
        try:
            messages = json.loads(raw_transcript)
        except Exception as e:
            raise ValueError(f"Transcript JSON could not be parsed: {e}")
    elif isinstance(raw_transcript, list):
        messages = raw_transcript
    else:
        raise TypeError(
            f"Transcript must be a JSON string or list, got {type(raw_transcript)}"
        )

    # Step 2: Normalize messages
    cleaned = []
    for m in messages:
        role = m.get("role")
        text = m.get("message", "").strip()
        emotion = m.get("prosodyScores", None)
        timestamp = m.get("timestamp", None)
        cleaned.append({"role": role, "text": text, "emotions": emotion, "timestamp": timestamp})

    # Step 3: Group into user+assistant turns
    turns = []
    i = 0
    n = len(cleaned)

    while i < n:
        if cleaned[i]["role"] != "user":
            i += 1
            continue  # skip until we find a user message

        # Collect consecutive user messages
        user_texts = []
        user_emotions = []
        while i < n and cleaned[i]["role"] == "user":
            user_texts.append(cleaned[i]["text"])
            if cleaned[i]["emotions"]:
                user_emotions.append(cleaned[i]["emotions"])
            i += 1

        # Collect consecutive assistant messages immediately after
        assistant_texts = []
        assistant_emotions = []
        while i < n and cleaned[i]["role"] == "assistant":
            assistant_texts.append(cleaned[i]["text"])
            if cleaned[i]["emotions"]:
                assistant_emotions.append(cleaned[i]["emotions"])
            i += 1

        turns.append({
            "user_text": " ".join(user_texts),
            "user_emotions": user_emotions if user_emotions else None,
            "assistant_text": " ".join(assistant_texts) if assistant_texts else None,
            "timestamp": "".join(timestamp) if timestamp else None,  # first user timestamp
            # "assistant_emotions": assistant_emotions if assistant_emotions else None
        })

    return turns


conv_json = load_json("demo_json_files/user_conversation.json")
entry = conv_json["1"]     # or your extracted dict


# turns = parse_transcript_into_turns(entry["transcript"])
# for t in turns:
#     print("----------------------------")
#     print("USER:", t["user_text"])
#     # print("USER_EMOTION:", t["user_emotions"])
#     print("ASSISTANT:", t["assistant_text"])
#     # print("ASSISTANT_EMOTION:", t["assistant_emotions"])




import json

# -----------------------------
# Load a JSON file
# -----------------------------
def load_json(path):
    with open(path, "r") as f:
        return json.load(f)


# ---------------------------------------------------------------
# Extract entry with a key matching the numeric index
# ---------------------------------------------------------------
def extract_entry_by_index(json_obj, index):
    key = str(index)
    if key not in json_obj:
        raise KeyError(f"Key '{key}' not found in JSON. Available keys: {list(json_obj.keys())}")
    return key, json_obj[key]


# ---------------------------------------------------------------
# Custom extractors
# ---------------------------------------------------------------
def extract_conversation_text(entry):
    return entry.get("transcript") or entry.get("messages") or entry.get("text") or ""


def extract_clinical_case_text(clinical_entry):
    """
    Takes a clinical case entry dict and returns a formatted string 
    containing only clinically relevant information.
    """
    relevant_keys = [
        ("Chief Complaint", "chiefComplaint"),
        ("History of Present Illness", "historyOfPresentIllness"),
        ("Past Medical History", "pastMedicalHistory"),
        ("Medications and Allergies", "medicationsAndAllergies"),
        ("Family History", "familyHistory"),
        ("Social History", "socialHistory"),
        ("Review of Systems", "reviewOfSystems"),
        ("Patient Personality", "patientPersonality"),
        ("Patient Communication", "patientCommunication"),
        ("Setting", "setting")
    ]

    formatted_lines = []
    for title, key in relevant_keys:
        if clinical_entry.get(key):
            formatted_lines.append(f"{title}:\n{clinical_entry[key]}\n")

    return "\n".join(formatted_lines).strip()


# ---------------------------------------------------------------
# Create prompts for each conversation turn
# ---------------------------------------------------------------

def create_turn_prompts(user_conversation_path, clinical_case_path, configuration_path, index=1):
    # Load JSON
    user_conv_json = load_json(user_conversation_path)
    clinical_json  = load_json(clinical_case_path)
    config_json    = load_json(configuration_path)
    
    # Extract entry for the given index
    _, user_conv_entry = extract_entry_by_index(user_conv_json, index)
    _, clinical_entry  = extract_entry_by_index(clinical_json, index)
    _, rubric_entry    = extract_entry_by_index(config_json, index)
    rubric_text     = rubric_entry.get("rubric", "")

    # Extract clinical case text
    clinical_case = extract_clinical_case_text(clinical_entry)

    # Parse grouped turns from the transcript
    from conversation_evaluation import parse_transcript_into_turns  # updated function
    raw_transcript = extract_conversation_text(user_conv_entry)
    turns = parse_transcript_into_turns(raw_transcript)

    # Build a prompt per turn, including full conversation so far
    turn_prompts = []
    full_conversation = []

    for i, turn in enumerate(turns, start=1):
        # Update full conversation with labeled turn
        labeled_turn = f"Turn {i}: \nUser: {turn['user_text']}\nAssistant: {turn['assistant_text'] or '[No assistant response]'}\n"
        full_conversation.append(labeled_turn)

        # Build prompt
#         prompt = f"""
# You are evaluating a simulated clinical conversation.

# Clinical Case:
# {clinical_case}

# Rubric:
# {rubric_text}

# Current Conversation Turn {i}:
# User: {turn['user_text']}
# Assistant: {turn['assistant_text'] or '[No assistant response]'}


# Full Conversation So Far:
# {chr(10).join(full_conversation)}


# Provide your evaluation according to clinical communication best practices.
#         """.strip()

        prompt = f"""
        You are a licensed clinical educator evaluating a simulated clinical conversation between a **student clinician** and an **AI patient**.

        ---
        ### Clinical Case
        {clinical_case}

        ### Evaluation Rubric
        {rubric_text}

        ### Conversation Context
        **Current Conversation Turn ({i}):**
        User (Student): {turn['user_text']}
        Assistant (Patient): {turn['assistant_text'] or '[No assistant response]'}

        **Full Conversation So Far:**
        {chr(10).join(full_conversation)}

        ---

        ### Your Task
        You are to **evaluate the student’s performance** according to the rubric above and clinical communication best practices.  

        Please:
        1. Assess each rubric category individually.
        2. Provide a **numerical score** for each (based on rubric scales).
        3. Give a **specific, constructive comment** explaining your reasoning.
        4. Provide an **overall summary** (score, qualitative level, key strengths, areas for improvement).
        5. Suggest **3 specific recommendations** for how the student can improve.

        ---

        ### Output Format
        Respond **only in valid JSON** using the following structure:

        {{
        "evaluation_metadata": {{
            "clinical_case_title": "<Insert case title or diagnosis>",
            "conversation_turn_number": {i},
            "evaluator_role": "Clinical Expert Evaluator",
            "timestamp": "<Auto-generate current ISO timestamp>"
        }},
        "conversation_context": {{
            "current_turn": {{
            "user_text": "{turn['user_text']}",
            "assistant_text": "{turn['assistant_text'] or '[No assistant response]'}"
            }},
            "summary_of_full_conversation": "<Brief 2–3 sentence summary of interaction so far>"
        }},
        "rubric_evaluation": {{
            "<Rubric Category 1>": {{
            "score": <integer>,
            "comment": "<Expert feedback>"
            }},
            "<Rubric Category 2>": {{
            "score": <integer>,
            "comment": "<Expert feedback>"
            }}
            // Continue for all rubric categories
        }},
        "overall_summary": {{
            "total_score": <integer>,
            "maximum_score": <integer>,
            "performance_level": "<e.g., Emerging / Proficient / Exemplary>",
            "summary_comment": "<Concise expert summary of overall performance>"
        }},
        "next_steps_recommendations": [
            "<Recommendation 1>",
            "<Recommendation 2>",
            "<Recommendation 3>"
        ]
        }}

        Ensure the JSON is **valid and machine-readable**, with no additional explanations outside the JSON.
        """.strip()


        turn_prompts.append({
            "turn_index": i,
            "prompt": prompt,
            "user_text": turn["user_text"],
            "assistant_text": turn["assistant_text"],
            "full_conversation": full_conversation.copy()
        })

    return turn_prompts


import os
from dotenv import load_dotenv
from openai import OpenAI

# Load API key from .env
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

import json
import time
from tqdm import tqdm


from tqdm import tqdm
import time


def call_llm_for_turns(turn_prompts, num_prompts=None, model="gpt-5", temperature=0.7, output_path="llm_turn_results.json"):
    """
    Calls the OpenAI LLM for each turn prompt with progress bar and timing info.
    Automatically calls save_llm_results_to_json after each response to save results incrementally.
    """
    if num_prompts is None:
        prompts_to_process = turn_prompts
    else:
        prompts_to_process = turn_prompts[:num_prompts]

    responses = []

    total_start = time.time()
    print(f"\n🔹 Starting LLM calls for {len(prompts_to_process)} turns using model={model}\n")

    for turn in tqdm(prompts_to_process, desc="Processing turns", unit="turn"):
        turn_start = time.time()

        try:
            # ---- Call the model ----
            response = client.responses.create(
                model=model,
                input=turn["prompt"],
                # temperature=temperature
            )

            llm_text = response.output_text.strip() if response.output_text else None

            elapsed = time.time() - turn_start
            print(f"\n✅ Turn {turn['turn_index']} completed in {elapsed:.2f}s")
            if llm_text:
                print(f"🔹 Raw Response Preview:\n{textwrap.indent(llm_text[:500] + ('...' if len(llm_text) > 500 else ''), '   ')}")
            else:
                print(f"🔹 Response is None")

            result = {"turn_index": turn["turn_index"], "response": llm_text}
            responses.append(result)

            # --- Call your helper function here for incremental save ---
            save_llm_results_to_json(turn_prompts, responses, output_path=output_path)

        except Exception as e:
            print(f"❌ Error on turn {turn['turn_index']}: {e}")
            responses.append({"turn_index": turn["turn_index"], "response": None})
            # Also save partial results if there is an error
            save_llm_results_to_json(turn_prompts, responses, output_path=output_path)

    total_elapsed = time.time() - total_start
    print(f"\n🏁 All turns processed in {total_elapsed:.2f} seconds ({len(prompts_to_process)} total)\n")

    return responses

prompts = create_turn_prompts(
    "demo_json_files/user_conversation.json",
    "demo_json_files/clinical_case.json",
    "demo_json_files/configuration.json",
    index=1
)

import json

import json
import textwrap
import json
import textwrap

def save_llm_results_to_json(turn_prompts, llm_results, output_path="llm_turn_results.json"):
    """
    Save prompts and LLM responses to a JSON file.
    Automatically parses JSON responses, pretty-prints console output,
    and overwrites the file with all collected results (incremental save).
    
    Parameters:
        turn_prompts (list): Original list of prompts
        llm_results (list): List of LLM outputs with 'turn_index' and 'response'
        output_path (str): Path to save JSON file
    """
    data_to_save = []
    prompt_map = {t["turn_index"]: t["prompt"] for t in turn_prompts}

    print("\n📄 Preparing data for saving...\n")

    for result in llm_results:
        turn_index = result["turn_index"]
        prompt_text = prompt_map.get(turn_index, "[Prompt not found]")
        response_text = result.get("response")

        # --- Parse JSON if possible ---
        parsed_response = None
        if isinstance(response_text, str):
            print(f"🔹 Parsing response for turn {turn_index}...")
            try:
                parsed_response = json.loads(response_text)
                print(f"✅ Successfully parsed JSON for turn {turn_index}")
            except json.JSONDecodeError:
                parsed_response = response_text.strip()
                print(f"⚠️ Response for turn {turn_index} is not valid JSON, keeping as text")
        else:
            parsed_response = response_text
            print(f"ℹ️ Response for turn {turn_index} is None or not a string, storing as-is")

        # --- Console preview ---
        print(f"🌀 Turn {turn_index}")
        print(f"🔹 Prompt:\n{textwrap.indent(prompt_text[:600] + ('...' if len(prompt_text) > 600 else ''), '   ')}")
        if isinstance(parsed_response, (dict, list)):
            print(f"🔹 Response (parsed JSON):\n{textwrap.indent(json.dumps(parsed_response, indent=2, ensure_ascii=False)[:800], '   ')}")
        elif isinstance(parsed_response, str):
            print(f"🔹 Response (text):\n{textwrap.indent(parsed_response[:600] + ('...' if len(parsed_response) > 600 else ''), '   ')}")
        else:
            print(f"🔹 Response: None")
        print("-" * 80)

        # --- Add to data to save ---
        data_to_save.append({
            "turn_index": turn_index,
            "prompt": prompt_text,
            "response": parsed_response
        })

    # --- Overwrite JSON file with all completed turns ---
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data_to_save, f, indent=2, ensure_ascii=False)
    print(f"\n✅ Saved {len(data_to_save)} prompts and responses to '{output_path}'\n")

# ----------------------
# Example usage:
# ----------------------

# print(prompts)
# llm_results = call_llm_for_turns(prompts, num_prompts=1)
# llm_results = call_llm_for_turns(prompts, num_prompts=2, output_path="my_turn_results.json")
llm_results = call_llm_for_turns(prompts, output_path="my_turn_results.json")

# save_llm_results_to_json(prompts, llm_results, "my_turn_results.json")

