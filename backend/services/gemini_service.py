import os
import json
import google.generativeai as genai

from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)
genai.configure(
api_key=os.getenv("GEMINI_API_KEY")
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

Generate:

1. Project Overview
2. Recommended Tech Stack
3. Architecture
4. Database Design
5. API Suggestions
6. Development Roadmap
7. Deployment Plan

Return JSON ONLY.

Example:

{{
"overview": "...",
"techStack": ["React"],
"architecture": "...",
"database": "...",
"apis": ["POST /login"],
"roadmap": ["Phase 1"],
"deployment": ["Vercel"]
}}
"""

    response = model.generate_content(prompt)

    return response.text
