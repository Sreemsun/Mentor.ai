import os
import json
import google.generativeai as genai
from groq import Groq
from dotenv import load_dotenv
from pathlib import Path


env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)
genai.configure(
api_key=os.getenv("GEMINI_API_KEY")
)
groq_client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")

def generate_project_roadmap(
project_idea,
experience_level
):

    prompt = f"""
You are a senior software architect.

Project Idea:
{project_idea}

Experience Level:
{experience_level}

Generate a complete project roadmap.

Return ONLY valid JSON.

Rules:
- No markdown
- No headings
- No explanations outside JSON
- techStack must contain objects with name and reason
- roadmap must be an array of short phases
- apis must contain only API endpoints
- deployment must be an array of deployment steps

Example JSON:

{{
  "overview": "...",

  "techStack": [
    {{
      "name": "React",
      "reason": "Builds the frontend UI"
    }}
  ],

  "architecture": "...",

  "database": {{
    "collections": [],
    "fields": {{}},
    "relationships": []
  }},

  "apis": [],

  "roadmap": [],

  "deployment": []
}}


apis must contain only endpoints.

Example:

[
  "POST /login",
  "POST /register",
  "GET /weather",
  "GET /forecast"
]

deployment must be a list.

Example:

[
  "Frontend: Vercel",
  "Backend: Render",
  "Database: MongoDB Atlas"
]
Example:

{{
  "overview": "...",

  "techStack": [
    {{
      "name": "React",
      "reason": "Builds responsive user interfaces"
    }},
    {{
      "name": "Node.js",
      "reason": "Handles backend APIs"
    }}
  ],

  "architecture": "...",

  "database": {{
    "collections": ["users", "rooms"],
    "fields": {{
      "users": ["id", "name", "email"],
      "rooms": ["roomNumber", "type"]
    }},
    "relationships": [
      "users -> bookings",
      "rooms -> bookings"
    ]
  }},

  "apis": ["POST /login"],

  "roadmap": ["Phase 1"],

  "deployment": ["Vercel"]
}}
"""

    try:
        response = model.generate_content(prompt)
        text = response.text

    except Exception as e:

        print("Gemini failed:", e)
        print("Using Groq fallback...")

        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        text = response.choices[0].message.content

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    try:
        return json.loads(text)

    except Exception as e:
        return {
            "error": "Failed to parse Gemini response",
            "raw": text
    }

def ask_project_question(
    project_idea,
    roadmap,
    question
):

    prompt = f"""
You are an expert software mentor.

Project Idea:
{project_idea}

Generated Roadmap:
{json.dumps(roadmap, indent=2)}

Student Question:
{question}

Answer like a senior developer mentoring a college student.

Rules:
- Maximum 100 words.
- Use simple language.
- Use bullet points.
- Do not use markdown symbols like ** or *.
- Give practical examples from the project.
- Avoid long paragraphs.

"""

    try:
        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        print("Gemini failed:", e)
        print("Using Groq fallback...")

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