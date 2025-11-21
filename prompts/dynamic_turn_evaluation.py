# import json
# from prompts.turn_prompt_builder import load_prompt_template
# from utils.file_utils import load_json
# from utils.extraction_utils import (
#     extract_entry_by_index,
#     extract_conversation_text,
#     extract_clinical_case_text
# )
# from utils.conversation_utils import parse_transcript_into_turns
# from llm.llm_runner import client  # adjust import
# import os


# def run_dynamic_turn_evaluation(
#     user_conversation_path,
#     clinical_case_path,
#     configuration_path,
#     template_path,
#     output_path="results/turn_evaluations.json",
#     model="gpt-5",
#     index=1,
# ):
#     # Load input JSONs
#     user_conv_json = load_json(user_conversation_path)
#     clinical_json  = load_json(clinical_case_path)
#     config_json    = load_json(configuration_path)

#     _, user_conv_entry = extract_entry_by_index(user_conv_json, index)
#     _, clinical_entry  = extract_entry_by_index(clinical_json, index)
#     _, rubric_entry    = extract_entry_by_index(config_json, index)

#     rubric_text = rubric_entry["rubric"]
#     clinical_case_text = extract_clinical_case_text(clinical_entry)

#     # Conversation list of dicts: [{"user_text":..., "assistant_text":...}]
#     turns = parse_transcript_into_turns(extract_conversation_text(user_conv_entry))

#     # Create results directory
#     os.makedirs(os.path.dirname(output_path), exist_ok=True)

#     # This accumulates all rubric evaluations from previous turns
#     cumulative_rubric_json = {}

#     eval_results = []

#     for i, turn in enumerate(turns, start=1):
#         # Build conversation-so-far text
#         conversation_so_far_text = build_conversation_so_far(turns, i)

#         # Build prompt dynamically with cumulative rubric
#         prompt = build_turn_prompt(
#             template_path=template_path,
#             turn_index=i,
#             clinical_case_text=clinical_case_text,
#             rubric_text=rubric_text,
#             llm_rubric_text=json.dumps(cumulative_rubric_json, indent=2),
#             user_text=turn["user_text"],
#             assistant_text=turn["assistant_text"] or "[No assistant response]",
#             conversation_so_far=conversation_so_far_text,
#             user_timestamp=turn["user_timestamp"],
#             assistant_timestamp=turn["assistant_timestamp"],
#         )

#         # --- Call LLM ---
#         llm_response = client.responses.create(model=model, input=prompt)
#         text = llm_response.output_text.strip()

#         # Extract the rubric evaluation for this turn
#         this_turn_json = json.loads(text)
#         this_turn_rubric = this_turn_json["rubric_evaluation"]

#         print(this_turn_rubric)
#         # Update cumulative rubric
#         cumulative_rubric_json[i] = this_turn_rubric

#         # Save result
#         eval_results.append({
#             "turn_index": i,
#             "response_json": this_turn_json
#         })

#         # Write file as we go
#         with open(output_path, "w", encoding="utf-8") as f:
#             json.dump(eval_results, f, indent=2, ensure_ascii=False)

#     return eval_results

# def build_turn_prompt(
#     template_path,
#     turn_index,
#     clinical_case_text,
#     rubric_text,
#     llm_rubric_text,
#     user_text,
#     assistant_text,
#     conversation_so_far,
#     user_timestamp,
#     assistant_timestamp
# ):
#     template = load_prompt_template(template_path)

#     prompt = template.format(
#         turn_index=turn_index,
#         clinical_case_text=clinical_case_text,
#         rubric_text=rubric_text,
#         llm_rubric_text=llm_rubric_text,
#         user_text=user_text,
#         assistant_text=assistant_text,
#         conversation_so_far=conversation_so_far,
#         user_timestamp=user_timestamp,
#         assistant_timestamp=assistant_timestamp
#     )

#     return prompt


# def build_conversation_so_far(turns, up_to_index):
#     lines = []
#     for i, t in enumerate(turns[:up_to_index], start=1):
#         lines.append(
#             f"Turn {i}:\n"
#             f"User: {t['user_text']}\n"
#             f"Assistant: {t['assistant_text'] or '[No assistant response]'}\n"
#         )
#     return "\n".join(lines)



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
            print(f"[DEBUG] Prompt content:\n{prompt}...\n")

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


# def run_dynamic_turn_evaluation(
#     user_conversation_path,
#     clinical_case_path,
#     configuration_path,
#     template_path,
#     output_path="results/turn_evaluations.json",
#     model="gpt-5",
#     index=1,
# ):
#     print(f"[INFO] Loading JSON files...")
#     user_conv_json = load_json(user_conversation_path)
#     clinical_json  = load_json(clinical_case_path)
#     config_json    = load_json(configuration_path)
#     print(f"[INFO] JSON files loaded successfully.")

#     print(f"[INFO] Extracting entries at index {index}...")
#     _, user_conv_entry = extract_entry_by_index(user_conv_json, index)
#     _, clinical_entry  = extract_entry_by_index(clinical_json, index)
#     _, rubric_entry    = extract_entry_by_index(config_json, index)
#     print(f"[INFO] Entries extracted.")

#     rubric_text = rubric_entry["rubric"]
#     clinical_case_text = extract_clinical_case_text(clinical_entry)

#     # Conversation list of dicts: [{"user_text":..., "assistant_text":...}]
#     turns = parse_transcript_into_turns(extract_conversation_text(user_conv_entry))
#     print(f"[INFO] Parsed {len(turns)} conversation turns.")

#     # Create results directory
#     os.makedirs(os.path.dirname(output_path), exist_ok=True)

#     cumulative_rubric_json = {}
#     eval_results = []

#     for i, turn in enumerate(turns, start=1):
#         print(f"\n[INFO] Processing turn {i}/{len(turns)}...")
#         conversation_so_far_text = build_conversation_so_far(turns, i)

#         prompt = build_turn_prompt(
#             template_path=template_path,
#             turn_index=i,
#             clinical_case_text=clinical_case_text,
#             rubric_text=rubric_text,
#             llm_rubric_text=json.dumps(cumulative_rubric_json, indent=2),
#             user_text=turn["user_text"],
#             assistant_text=turn["assistant_text"] or "[No assistant response]",
#             conversation_so_far=conversation_so_far_text,
#             user_timestamp=turn.get("user_timestamp", "N/A"),
#             assistant_timestamp=turn.get("assistant_timestamp", "N/A"),
#         )
#         print(f"[INFO] Prompt for turn {i} built.")

#         # --- Call LLM ---
#         llm_response = client.responses.create(model=model, input=prompt)
#         text = llm_response.output_text.strip()

#         # Extract the rubric evaluation for this turn
#         this_turn_json = json.loads(text)
#         this_turn_rubric = this_turn_json.get("rubric_evaluation", {})
#         print(f"[INFO] Rubric extracted for turn {i}: {this_turn_rubric}")

#         # Update cumulative rubric
#         cumulative_rubric_json[i] = this_turn_rubric

#         # Save result
#         eval_results.append({
#             "turn_index": i,
#             "response_json": this_turn_json
#         })

#         # Write file as we go
#         with open(output_path, "w", encoding="utf-8") as f:
#             json.dump(eval_results, f, indent=2, ensure_ascii=False)
#         print(f"[INFO] Results written to {output_path} after turn {i}.")

#     print(f"\n[INFO] Dynamic turn evaluation complete. Total turns processed: {len(turns)}")
#     return eval_results


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
