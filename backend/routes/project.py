from fastapi import APIRouter
from pydantic import BaseModel

from models.project_model import ProjectRequest
from services.gemini_service import (
    generate_project_roadmap,
    ask_project_question
)

router = APIRouter()


class AskRequest(BaseModel):
    projectIdea: str
    roadmap: dict
    question: str


@router.post("/generate-roadmap")
def generate_roadmap(data: ProjectRequest):

    return generate_project_roadmap(
        data.projectIdea,
        data.experienceLevel
    )


@router.post("/ask")
def ask_ai(data: AskRequest):

    answer = ask_project_question(
        data.projectIdea,
        data.roadmap,
        data.question
    )

    return {
        "answer": answer
    }