import json

def parse_transcript_into_turns(raw_transcript):
    if isinstance(raw_transcript, str):
        try:
            messages = json.loads(raw_transcript)
        except Exception as e:
            raise ValueError(f"Transcript JSON could not be parsed: {e}")
    elif isinstance(raw_transcript, list):
        messages = raw_transcript
    else:
        raise TypeError(f"Transcript must be a JSON string or list, got {type(raw_transcript)}")

    cleaned = []
    for m in messages:
        cleaned.append({
            "role": m.get("role"),
            "text": m.get("message", "").strip(),
            "emotions": m.get("prosodyScores"),
            "timestamp": m.get("timestamp", None)
        })

    turns, i, n = [], 0, len(cleaned)

    while i < n:
        if cleaned[i]["role"] != "user":
            i += 1
            continue

        user_texts, user_emotions, user_timestamps = [], [], []
        while i < n and cleaned[i]["role"] == "user":
            user_texts.append(cleaned[i]["text"])
            if cleaned[i]["emotions"]:
                user_emotions.append(cleaned[i]["emotions"])
            if cleaned[i]["timestamp"]:
                user_timestamps.append(cleaned[i]["timestamp"])
            i += 1

        assistant_texts, assistant_emotions, assistant_timestamps = [], [], []
        while i < n and cleaned[i]["role"] == "assistant":
            assistant_texts.append(cleaned[i]["text"])
            if cleaned[i]["emotions"]:
                assistant_emotions.append(cleaned[i]["emotions"])
            if cleaned[i]["timestamp"]:
                assistant_timestamps.append(cleaned[i]["timestamp"])
            i += 1

        turns.append({
            "user_text": " ".join(user_texts),
            "user_emotions": user_emotions or None,
            "assistant_text": " ".join(assistant_texts) if assistant_texts else None,
            "user_timestamp": "".join(user_timestamps) if user_timestamps else None,
            "assistant_timestamp": "".join(assistant_timestamps) if assistant_timestamps else None

        })
    return turns