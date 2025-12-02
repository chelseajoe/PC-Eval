import json
from prompts.turn_prompt_builder import load_prompt_template
from utils.file_utils import load_json
from utils.extraction_utils import (
    extract_entry_by_index,
    extract_conversation_text,
    extract_clinical_case_text
)
from utils.conversation_utils import parse_transcript_into_turns
from llm.llm_runner import client  # adjust import
import os


def run_dynamic_turn_evaluation(
    user_conversation_path,
    clinical_case_path,
    configuration_path,
    template_path,
    output_path="results/turn_evaluations.json",
    model="gpt-5",
    index=1,
):
    print(f"[INFO] Loading JSON files...")
    user_conv_json = load_json(user_conversation_path)
    clinical_json  = load_json(clinical_case_path)
    config_json    = load_json(configuration_path)
    print(f"[INFO] JSON files loaded successfully.")

    # --- Determine indices to process ---
    if index is None:
        total_entries = min(len(user_conv_json), len(clinical_json), len(config_json))
        indices_to_process = list(range(1, total_entries + 1))
        print(f"[INFO] No index provided — processing ALL {total_entries} entries.")
    elif isinstance(index, (list, tuple)) and len(index) == 2:
        start, end = index
        indices_to_process = list(range(start, end + 1))
        print(f"[INFO] Range detected — processing indices {start} through {end}.")
    else:
        indices_to_process = [index]
        print(f"[INFO] Single index detected — processing index {index}.")

    eval_results = []

    for idx in indices_to_process:
        print(f"\n==============================")
        print(f"[INFO] Processing entry index {idx}")
        print("==============================")

        # Extract entries
        _, user_conv_entry = extract_entry_by_index(user_conv_json, idx)
        _, clinical_entry  = extract_entry_by_index(clinical_json, idx)
        _, rubric_entry    = extract_entry_by_index(config_json, idx)

        rubric_text = rubric_entry["rubric"]
        clinical_case_text = extract_clinical_case_text(clinical_entry)

        turns = parse_transcript_into_turns(extract_conversation_text(user_conv_entry))
        print(f"[INFO] Parsed {len(turns)} conversation turns for entry {idx}.")

        cumulative_rubric_json = {}

        for i, turn in enumerate(turns, start=1):
            print(f"\n[INFO] Processing turn {i}/{len(turns)} for entry {idx}...")
            conversation_so_far_text = build_conversation_so_far(turns, i)

            prompt = build_turn_prompt(
                template_path=template_path,
                turn_index=i,
                clinical_case_text=clinical_case_text,
                rubric_text=rubric_text,
                llm_rubric_text=json.dumps(cumulative_rubric_json, indent=2),
                user_text=turn["user_text"],
                assistant_text=turn["assistant_text"] or "[No assistant response]",
                conversation_so_far=conversation_so_far_text,
                user_timestamp=turn.get("user_timestamp", "N/A"),
                assistant_timestamp=turn.get("assistant_timestamp", "N/A"),
            )
            print(f"[INFO] Prompt for turn {i} built.")
            # print(f"[DEBUG] Prompt content:\n{prompt}...\n")

            # --- Call LLM ---
            llm_response = client.responses.create(model=model, input=prompt)
            text = llm_response.output_text.strip()

            this_turn_json = json.loads(text)
            this_turn_rubric = this_turn_json.get("rubric_evaluation", {})
            print(f"[INFO] Rubric extracted for turn {i}: {this_turn_rubric}")

            cumulative_rubric_json[i] = this_turn_rubric

            eval_results.append({
                "entry_index": idx,
                "turn_index": i,
                "response_json": this_turn_json
            })

            with open(output_path, "w", encoding="utf-8") as f:
                json.dump(eval_results, f, indent=2, ensure_ascii=False)
            print(f"[INFO] Results written to {output_path} after turn {i}.")

    print(f"\n[INFO] Dynamic turn evaluation complete. Total entries processed: {len(indices_to_process)}")
    return eval_results


def build_turn_prompt(
    template_path,
    turn_index,
    clinical_case_text,
    rubric_text,
    llm_rubric_text,
    user_text,
    assistant_text,
    conversation_so_far,
    user_timestamp,
    assistant_timestamp
):
    template = load_prompt_template(template_path)
    prompt = template.format(
        turn_index=turn_index,
        clinical_case_text=clinical_case_text,
        rubric_text=rubric_text,
        llm_rubric_text=llm_rubric_text,
        user_text=user_text,
        assistant_text=assistant_text,
        conversation_so_far=conversation_so_far,
        user_timestamp=user_timestamp,
        assistant_timestamp=assistant_timestamp
    )
    print(f"[DEBUG] Prompt formatted for turn {turn_index}.")
    return prompt


def build_conversation_so_far(turns, up_to_index):
    lines = []
    for i, t in enumerate(turns[:up_to_index], start=1):
        lines.append(
            f"Turn {i}:\n"
            f"User: {t['user_text']}\n"
            f"Assistant: {t['assistant_text'] or '[No assistant response]'}\n"
        )
    return "\n".join(lines)


from prompts.dynamic_turn_evaluation import run_dynamic_turn_evaluation
from llm.llm_runner import client
import json
import os

from prompts.dynamic_turn_evaluation import run_dynamic_turn_evaluation
from llm.llm_runner import client
import json
import os


def run_full_evaluation(
    user_conversation_path,
    clinical_case_path,
    configuration_path,
    template_path,
    turn_eval_output="results/turn_evaluations.json",
    final_eval_output="results/final_evaluation.json",
    model="gpt-5",
    index=1,
    final_prompt_path="prompts/template/final_evaluation_prompt.txt"
):
    """
    Runs dynamic turn evaluation on a conversation, then performs a final evaluation
    on all turn evaluation results as a single JSON.

    Args:
        user_conversation_path (str): Path to user conversation JSON.
        clinical_case_path (str): Path to clinical case JSON.
        configuration_path (str): Path to rubric/configuration JSON.
        template_path (str): Path to turn evaluation prompt template.
        turn_eval_output (str): Path to save turn evaluation results.
        final_eval_output (str): Path to save final evaluation results.
        model (str): Model to use for both evaluations.
        index (int or list/tuple): Which entries to process.
        final_prompt_path (str): Path to the final evaluation prompt template.

    Returns:
        tuple: (turn_evaluation_results, final_evaluation_results)
    """

    # --- Step 1: Run dynamic turn evaluation ---
    eval_results = run_dynamic_turn_evaluation(
        user_conversation_path=user_conversation_path,
        clinical_case_path=clinical_case_path,
        configuration_path=configuration_path,
        template_path=template_path,
        output_path=turn_eval_output,
        model=model,
        index=index
    )

    # --- Step 2: Run final evaluation on all results as one JSON ---
    print(f"[INFO] Running final evaluation on all turn results...")

    with open(final_prompt_path, "r", encoding="utf-8") as f:
        final_prompt_template = f.read()

    # Format prompt with all eval_results
    prompt = final_prompt_template.format(
        turn_evaluations=json.dumps(eval_results, indent=2)
    )

    llm_response = client.responses.create(model=model, input=prompt)
    text = llm_response.output_text.strip()

    try:
        final_results = json.loads(text)
    except json.JSONDecodeError:
        print(f"[WARNING] Could not parse JSON from final evaluation. Saving raw text.")
        final_results = {"raw_text": text}

    # Save final evaluation results
    os.makedirs(os.path.dirname(final_eval_output), exist_ok=True)
    with open(final_eval_output, "w", encoding="utf-8") as f:
        json.dump(final_results, f, indent=2, ensure_ascii=False)

    print(f"[INFO] Full evaluation complete. Final results saved to {final_eval_output}")

    return eval_results, final_results
