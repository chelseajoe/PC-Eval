# # from prompts.turn_prompt_builder import create_turn_prompts
# # from llm.llm_runner import call_llm_for_turns
# from prompts.dynamic_turn_evaluation import run_dynamic_turn_evaluation

# run_dynamic_turn_evaluation(
#     user_conversation_path="demo_json_files/user_conversation.json",
#     clinical_case_path="demo_json_files/clinical_case.json",
#     configuration_path="demo_json_files/configuration.json",
#     template_path="prompts/templates/step_by_step_evaluation_prompt_v1.txt",
#     output_path="../results/new_turn_evaluations_TEST.json",
#     model="gpt-5",
#     index=1
# )

from prompts.dynamic_turn_evaluation import *

turn_results, final_results = run_full_evaluation(
    user_conversation_path="demo_json_files/user_conversation.json",
    clinical_case_path="demo_json_files/clinical_case.json",
    configuration_path="demo_json_files/configuration.json",
    template_path="prompts/templates/step_by_step_evaluation_prompt_v1.txt",
    turn_eval_output="results/new_turn_evaluations_TEST.json",
    final_eval_output="results/final_evaluation.json",
    model="gpt-5",
    index=4,  # process all entries
    final_prompt_path="prompts/templates/final_evaluation_prompt.txt"
)

