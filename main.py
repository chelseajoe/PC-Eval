# from prompts.turn_prompt_builder import create_turn_prompts
# from llm.llm_runner import call_llm_for_turns
from prompts.dynamic_turn_evaluation import run_dynamic_turn_evaluation

run_dynamic_turn_evaluation(
    user_conversation_path="demo_json_files/user_conversation.json",
    clinical_case_path="demo_json_files/clinical_case.json",
    configuration_path="demo_json_files/configuration.json",
    template_path="prompts/templates/step_by_step_evaluation_prompt_v1.txt",
    output_path="results/turn_evaluations_TEST.json",
    model="gpt-5",
    index=1
)
