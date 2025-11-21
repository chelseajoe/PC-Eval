import json
import textwrap
import os

def save_llm_results_to_json(turn_prompts, llm_results, output_path="llm_turn_results.json"):

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    data = []
    prompt_map = {t["turn_index"]: t["prompt"] for t in turn_prompts}

    for result in llm_results:
        idx = result["turn_index"]
        prompt = prompt_map.get(idx, "")
        response = result.get("response")

        try:
            parsed = json.loads(response)
        except Exception:
            parsed = response

        data.append({
            "turn_index": idx,
            "prompt": prompt,
            "response": parsed
        })

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved {len(data)} results to {output_path}")
