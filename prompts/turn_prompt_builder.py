# from utils.file_utils import load_json
# from utils.extraction_utils import (
#     extract_entry_by_index,
#     extract_conversation_text,
#     extract_clinical_case_text
# )
# from utils.conversation_utils import parse_transcript_into_turns

# def load_prompt_template(template_path):
#     """Load a text prompt template from file."""
#     with open(template_path, "r", encoding="utf-8") as f:
#         return f.read()


# def create_turn_prompts(
#     user_conversation_path,
#     clinical_case_path,
#     configuration_path,
#     index=1,
#     template_path="prompts/templates/evaluation_prompt_v1.txt"
# ):
#     """Build LLM-ready evaluation prompts for each conversation turn using an external text template."""

#     # --- Load JSONs ---
#     user_conv_json = load_json(user_conversation_path)
#     clinical_json  = load_json(clinical_case_path)
#     config_json    = load_json(configuration_path)
    
#     # --- Extract entries ---
#     _, user_conv_entry = extract_entry_by_index(user_conv_json, index)
#     _, clinical_entry  = extract_entry_by_index(clinical_json, index)
#     _, rubric_entry    = extract_entry_by_index(config_json, index)
#     rubric_text = rubric_entry.get("rubric", "")
#     clinical_case_text = extract_clinical_case_text(clinical_entry)

#     # --- Parse conversation ---
#     raw_transcript = extract_conversation_text(user_conv_entry)
#     turns = parse_transcript_into_turns(raw_transcript)

#     # --- Load template ---
#     template = load_prompt_template(template_path)

#     # --- Build prompts per turn ---
#     turn_prompts = []
#     conversation_so_far = []

#     for i, turn in enumerate(turns, start=1):
#         # Update conversation context
#         labeled_turn = (
#             f"Turn {i}:\n"
#             f"User: {turn['user_text']}\n"
#             f"Assistant: {turn['assistant_text'] or '[No assistant response]'}\n"
#             f"Timestamp: {turn['timestamp']}\n"
#         )
#         conversation_so_far.append(labeled_turn)

#         # Fill in the template using str.format()
#         prompt = template.format(
#             turn_index=i,
#             clinical_case_text=clinical_case_text,
#             rubric_text=rubric_text,
#             user_text=turn['user_text'],
#             assistant_text=turn['assistant_text'] or "[No assistant response]",
#             conversation_so_far="\n".join(conversation_so_far)
#         )

#         turn_prompts.append({
#             "turn_index": i,
#             "prompt": prompt,
#             "user_text": turn["user_text"],
#             "assistant_text": turn["assistant_text"],
#             "full_conversation": conversation_so_far.copy(),
#             "timestamp": turn["timestamp"]  
#         })

#     return turn_prompts



from utils.file_utils import load_json
from utils.extraction_utils import (
    extract_entry_by_index,
    extract_conversation_text,
    extract_clinical_case_text
)
from utils.conversation_utils import parse_transcript_into_turns

def load_prompt_template(template_path):
    """Load a text prompt template from file."""
    print(f"[INFO] Loading prompt template from: {template_path}")
    with open(template_path, "r", encoding="utf-8") as f:
        template = f.read()
    print("[INFO] Template loaded successfully.")
    return template


# def create_turn_prompts(
#     user_conversation_path,
#     clinical_case_path,
#     configuration_path,
#     index=1,
#     template_path="prompts/templates/evaluation_prompt_v1.txt"
# ):
#     """Build LLM-ready evaluation prompts for each conversation turn using an external text template."""

#     print("\n============================")
#     print("   STARTING PROMPT CREATION")
#     print("============================")

#     # --- Load JSONs ---
#     # print(f"[INFO] Loading user conversation JSON: {user_conversation_path}")
#     print(f"[INFO] Loading user information JSON: {user_conversation_path}")
#     user_conv_json = load_json(user_conversation_path)

#     # print(f"[INFO] Loading clinical case JSON: {clinical_case_path}")
#     clinical_json  = load_json(clinical_case_path)

#     # print(f"[INFO] Loading configuration/rubric JSON: {configuration_path}")
#     config_json    = load_json(configuration_path)

#     # --- Extract entries ---
#     print(f"[INFO] Extracting entry at index {index} from each JSON...")
#     # _, user_conv_entry = extract_entry_by_index(user_conv_json, index)
#     # _, clinical_entry  = extract_entry_by_index(clinical_json, index)
#     # _, rubric_entry    = extract_entry_by_index(config_json, index)

#     if index is None:
#         # Process ALL indices
#         total_entries = min(len(user_conv_json), len(clinical_json), len(config_json))
#         indices_to_process = list(range(1, total_entries + 1))
#         print(f"[INFO] No index provided — processing ALL {total_entries} entries.")

#     elif isinstance(index, (list, tuple)) and len(index) == 2:
#         # Process RANGE
#         start, end = index
#         indices_to_process = list(range(start, end + 1))
#         print(f"[INFO] Range detected — processing indices {start} through {end}.")

#     else:
#         # Single integer index
#         indices_to_process = [index]
#         print(f"[INFO] Single index detected — processing index {index}.")

    
#     # --- Extract entries from each JSON ---
#     extracted_entries = []
#     for idx in indices_to_process:
#         print(f"[INFO] Extracting entry at index {idx}...")
#         _, user_conv_entry = extract_entry_by_index(user_conv_json, idx)
#         _, clinical_entry  = extract_entry_by_index(clinical_json, idx)
#         _, rubric_entry    = extract_entry_by_index(config_json, idx)

#         extracted_entries.append({
#             "index": idx,
#             "user_conv_entry": user_conv_entry,
#             "clinical_entry": clinical_entry,
#             "rubric_entry": rubric_entry
#         })

#     rubric_text = rubric_entry.get("rubric", "")
#     print("[INFO] Rubric extracted.")

#     clinical_case_text = extract_clinical_case_text(clinical_entry)
#     print("[INFO] Clinical case extracted.")

#     # --- Parse conversation ---
#     print("[INFO] Extracting raw transcript from user conversation entry...")
#     raw_transcript = extract_conversation_text(user_conv_entry)

#     print("[INFO] Parsing transcript into turns...")
#     turns = parse_transcript_into_turns(raw_transcript)
#     print(f"[INFO] Parsed {len(turns)} turns.")

#     # --- Load template ---
#     template = load_prompt_template(template_path)

#     # --- Build prompts per turn ---
#     print("[INFO] Building prompts for each turn...")
#     turn_prompts = []
#     conversation_so_far = []

#     for i, turn in enumerate(turns, start=1):
#         print(f"\n[TURN {i}] Processing turn...")

#         # Update conversation context
#         labeled_turn = (
#             f"Turn {i}:\n"
#             f"User: {turn['user_text']}\n"
#             f"Assistant: {turn['assistant_text'] or '[No assistant response]'}\n"
#             f"Timestamp: {turn['timestamp']}\n"
#         )
#         conversation_so_far.append(labeled_turn)
#         print(f"[TURN {i}] Added to conversation history.")

#         # Fill template
#         prompt = template.format(
#             turn_index=i,
#             clinical_case_text=clinical_case_text,
#             rubric_text=rubric_text,
#             user_text=turn['user_text'],
#             assistant_text=turn['assistant_text'] or "[No assistant response]",
#             conversation_so_far="\n".join(conversation_so_far)
#         )
#         print(f"[TURN {i}] Prompt generated.")

#         turn_prompts.append({
#             "turn_index": i,
#             "prompt": prompt,
#             "user_text": turn["user_text"],
#             "assistant_text": turn["assistant_text"],
#             "full_conversation": conversation_so_far.copy(),
#             "timestamp": turn["timestamp"]
#         })

#     print("\n============================")
#     print("   PROMPT CREATION COMPLETE")
#     print(f"   Total prompts created: {len(turn_prompts)}")
#     print("============================\n")

#     return turn_prompts

def create_turn_prompts(
    user_conversation_path,
    clinical_case_path,
    configuration_path,
    index=1,
    template_path="prompts/templates/evaluation_prompt_v1.txt"
):
    """Build LLM-ready evaluation prompts for each conversation turn using an external text template."""

    print("\n============================")
    print("   STARTING PROMPT CREATION")
    print("============================")

    # --- Load JSONs ---
    print(f"[INFO] Loading user information JSON: {user_conversation_path}")
    user_conv_json = load_json(user_conversation_path)

    print(f"[INFO] Loading clinical case JSON: {clinical_case_path}")
    clinical_json = load_json(clinical_case_path)

    print(f"[INFO] Loading configuration/rubric JSON: {configuration_path}")
    config_json = load_json(configuration_path)

    # --- Determine indices to process ---
    print(f"[INFO] Determining indices to process (index={index})")

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

    # --- Extract entries ---
    extracted_entries = []
    print(f"[INFO] Extracting entries for indices: {indices_to_process}")

    for idx in indices_to_process:
        print(f"[INFO] Extracting entry at index {idx}...")

        _, user_conv_entry = extract_entry_by_index(user_conv_json, idx)
        _, clinical_entry = extract_entry_by_index(clinical_json, idx)
        _, rubric_entry = extract_entry_by_index(config_json, idx)

        extracted_entries.append({
            "index": idx,
            "user_conv_entry": user_conv_entry,
            "clinical_entry": clinical_entry,
            "rubric_entry": rubric_entry
        })

    # --- Load template once ---
    template = load_prompt_template(template_path)

    # --- Process each extracted entry ---
    all_turn_prompts = []

    for entry in extracted_entries:
        idx = entry["index"]
        user_conv_entry = entry["user_conv_entry"]
        clinical_entry = entry["clinical_entry"]
        rubric_entry = entry["rubric_entry"]

        print("\n--------------------------------------")
        print(f"[INFO] Processing conversation index {idx}")
        print("--------------------------------------")

        # Extract supporting text
        rubric_text = rubric_entry.get("rubric", "")
        print(f"[INFO] Rubric extracted for index {idx}")

        clinical_case_text = extract_clinical_case_text(clinical_entry)
        print(f"[INFO] Clinical case extracted for index {idx}")

        # Parse turns
        print(f"[INFO] Extracting raw transcript for index {idx}...")
        raw_transcript = extract_conversation_text(user_conv_entry)

        print(f"[INFO] Parsing transcript into turns for index {idx}...")
        turns = parse_transcript_into_turns(raw_transcript)
        print(f"[INFO] Parsed {len(turns)} turns for index {idx}")

        print(f"[INFO] Building prompts for index {idx}...")
        conversation_so_far = []
        turn_prompts = []

        for i, turn in enumerate(turns, start=1):
            print(f"\n[INDEX {idx} | TURN {i}] Processing turn...")

            labeled_turn = (
                f"Turn {i}:\n"
                f"User: {turn['user_text']}\n"
                f"Assistant: {turn['assistant_text'] or '[No assistant response]'}\n"
                f"Timestamp: {turn['timestamp']}\n"
            )
            conversation_so_far.append(labeled_turn)
            print(f"[INDEX {idx} | TURN {i}] Added to conversation history.")

            prompt = template.format(
                turn_index=i,
                clinical_case_text=clinical_case_text,
                rubric_text=rubric_text,
                user_text=turn['user_text'],
                assistant_text=turn['assistant_text'] or "[No assistant response]",
                conversation_so_far="\n".join(conversation_so_far)
            )
            print(f"[INDEX {idx} | TURN {i}] Prompt generated.")

            turn_prompts.append({
                "entry_index": idx,
                "turn_index": i,
                "prompt": prompt,
                "user_text": turn["user_text"],
                "assistant_text": turn["assistant_text"],
                "full_conversation": conversation_so_far.copy(),
                "timestamp": turn["timestamp"]
            })

        all_turn_prompts.append({
            "entry_index": idx,
            "turn_prompts": turn_prompts
        })

    print("\n============================")
    print("   PROMPT CREATION COMPLETE")
    print(f"   Total conversations processed: {len(all_turn_prompts)}")
    print("============================\n")

    return all_turn_prompts
