from fastapi import APIRouter
from models.project_model import ProjectRequest
from services.gemini_service import generate_project_roadmap

router = APIRouter()

@router.post("/generate-roadmap")
def generate_roadmap(data: ProjectRequest):

    result = generate_project_roadmap(
        data.projectIdea,
        data.experienceLevel
    )

    return {
        "response": result
    }