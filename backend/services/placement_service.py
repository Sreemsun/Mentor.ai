import json
from services.gemini_service import model

def generate_placement_plan(
    degree,
    year,
    skills,
    interests,
    target_role
):

    prompt = f"""
You are an expert placement mentor.

Student Details:

Degree: {degree}
Year: {year}
Skills: {skills}
Interests: {interests}
Target Role: {target_role}

Return ONLY valid JSON.

Format:

{{
  "recommendedRoles": [],
  "skillGap": [],
  "roadmap": [],
  "projects": [],
  "interviewTopics": [],
  "internshipStrategy": []
}}

Rules:

- recommendedRoles = suitable job roles
- skillGap = missing skills
- roadmap = learning plan
- projects = project ideas
- interviewTopics = interview preparation topics
- internshipStrategy = steps to get internships
"""

    response = model.generate_content(prompt)

    text = response.text
    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    return json.loads(text)