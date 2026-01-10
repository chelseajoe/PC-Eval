import json
import os
from utils.file_utils import load_json
from utils.extraction_utils import (
    extract_entry_by_index,
    extract_conversation_text,
    extract_clinical_case_text
)
from prompts.turn_prompt_builder import load_prompt_template
from llm.llm_runner import client


def run_prosody_evaluation(
    user_conversation_path,
    clinical_case_path,
    configuration_path,
    template_path="prompts/templates/prosody_eval_template.txt",
    output_path="results/prosody_evaluation.json",
    model="gpt-5",
    index=None,
):
    print("[INFO] Loading JSON files...")
    user_conv_json = load_json(user_conversation_path)
    clinical_json  = load_json(clinical_case_path)
    config_json    = load_json(configuration_path)

    # --- Determine indices ---
    if index is None:
        total_entries = min(len(user_conv_json), len(clinical_json), len(config_json))
        indices_to_process = list(range(1, total_entries + 1))
    elif isinstance(index, (list, tuple)) and len(index) == 2:
        start, end = index
        indices_to_process = list(range(start, end + 1))
    else:
        indices_to_process = [index]

    results = []

    template = load_prompt_template(template_path)

    for idx in indices_to_process:
        print(f"\n[INFO] Processing prosody for entry {idx}")

        _, user_conv_entry = extract_entry_by_index(user_conv_json, idx)
        _, clinical_entry  = extract_entry_by_index(clinical_json, idx)
        _, rubric_entry    = extract_entry_by_index(config_json, idx)

        conversation_text = extract_conversation_text(user_conv_entry)
        clinical_case_text = extract_clinical_case_text(clinical_entry)
        rubric_text = rubric_entry.get("rubric", "")

        # print(f"[DEBUG] Conversation Text:\n{conversation_text}\n")
        # --- Build single prompt ---
        prompt = template.format(
            conversation_text=conversation_text,
            # clinical_case_text=clinical_case_text,
            # rubric_text=rubric_text
        )

        # --- Call LLM ---
        response = client.responses.create(
            model=model,
            input=prompt
        )

        text = response.output_text.strip()

        print(f"[DEBUG] LLM Response:\n{text}")

        try:
            response_json = json.loads(text)
        except json.JSONDecodeError:
            response_json = {"raw_text": text}

        results.append({
            "entry_index": idx,
            "prosody_evaluation": response_json
        })

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

        print(f"[INFO] Saved prosody evaluation for entry {idx}")

    print("[INFO] Prosody evaluation complete.")
    return results

if __name__ == "__main__":
    run_prosody_evaluation(
        user_conversation_path="demo_json_files/user_conversation.json",
        clinical_case_path="demo_json_files/clinical_case.json",
        configuration_path="demo_json_files/configuration.json",
        template_path="prompts/templates/prosody_eval_template.txt",
        output_path="results/prosody_evaluations.json",  # pr_id_3_ms.json
        model="gpt-5",
        index=8  
    )