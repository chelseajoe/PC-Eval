def extract_entry_by_index(json_obj, index):
    key = str(index)
    if key not in json_obj:
        raise KeyError(f"Key '{key}' not found in JSON. Available keys: {list(json_obj.keys())}")
    return key, json_obj[key]


def extract_conversation_text(entry):
    return entry.get("transcript") or entry.get("messages") or entry.get("text") or ""


def extract_clinical_case_text(entry):
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
        ("Setting", "setting"),
    ]

    formatted = []
    for title, key in relevant_keys:
        if entry.get(key):
            formatted.append(f"{title}:\n{entry[key]}\n")

    return "\n".join(formatted).strip()
