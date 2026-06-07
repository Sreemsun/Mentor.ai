from fastapi import APIRouter

from models.placement_model import PlacementRequest

from services.placement_service import (
    generate_placement_plan
)

router = APIRouter()

@router.post("/generate")
def generate(data: PlacementRequest):

    return generate_placement_plan(
        data.degree,
        data.year,
        data.skills,
        data.interests,
        data.targetRole
    )