import json
from services.gemini_service import model, groq_client

def ask_placement_question(
    career_data,
    question
):

    prompt = f"""
You are an expert placement mentor.

Career Analysis:

{json.dumps(career_data, indent=2)}

Student Question:

{question}

Rules:

- Give practical guidance.
- Use simple language.
- Maximum 150 words.
- Explain like a senior mentor.
- Use short bullet points.
- Put each point on a new line.
- Do not write long paragraphs.
- Format plans like:

Day 1-5: Learn X

Day 6-10: Learn Y

Day 11-15: Build Z
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception:

        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content