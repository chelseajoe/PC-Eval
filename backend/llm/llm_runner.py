import time
import textwrap
from tqdm import tqdm
from .llm_client import client
from .llm_save_utils import save_llm_results_to_json

def call_llm_for_turns(turn_prompts, num_prompts=None, model="gpt-5", output_path="llm_turn_results.json"):
    prompts = turn_prompts if num_prompts is None else turn_prompts[:num_prompts]
    results = []

    print(f"\n🔹 Starting LLM calls for {len(prompts)} turns using {model}\n")
    total_start = time.time()

    for turn in tqdm(prompts, desc="Processing turns", unit="turn"):
        start = time.time()
        try:
            response = client.responses.create(model=model, input=turn["prompt"])
            text = response.output_text.strip() if response.output_text else None
            elapsed = time.time() - start
            print(f"✅ Turn {turn['turn_index']} completed in {elapsed:.2f}s")
            print(textwrap.indent(text[:500], "   "))

            results.append({"turn_index": turn["turn_index"], "response": text})
            save_llm_results_to_json(turn_prompts, results, output_path)

        except Exception as e:
            print(f"❌ Error on turn {turn['turn_index']}: {e}")
            results.append({"turn_index": turn["turn_index"], "response": None})
            save_llm_results_to_json(turn_prompts, results, output_path)

    total_elapsed = time.time() - total_start
    print(f"\n🏁 Completed in {total_elapsed:.2f}s")
    return results
