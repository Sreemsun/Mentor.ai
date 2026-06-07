import json
from services.gemini_service import model, groq_client

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
  "careerScore": 0,
  "recommendedRoles": [],
  "skillGap": [],
  "roadmap": [],
  "projects": [],
  "interviewTopics": [],
  "internshipStrategy": [],
  "learningResources": []
}}

Rules:
- recommendedRoles = suitable job roles
- skillGap = missing skills
- roadmap = learning plan
- projects = project ideas
- interviewTopics = interview preparation topics
- internshipStrategy = steps to get internships
- careerScore = number between 0 and 100
- learningResources = resources to learn missing skills

For learningResources use examples like:
- NeetCode
- Roadmap.sh
- FreeCodeCamp
- CS50
- React Documentation
- Node.js Documentation
- MongoDB University
- Java Brains
- CodeWithHarry

Return 5-8 resources.
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

    except Exception:
        return {
            "error": "Failed to parse response",
            "raw": text
        }