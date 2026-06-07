from fastapi import APIRouter
from pydantic import BaseModel
from services.placement_chat_service import ask_placement_question

router = APIRouter()

class PlacementQuestion(BaseModel):
    careerData: dict
    question: str

@router.post("/ask")
def ask(question: PlacementQuestion):

    answer = ask_placement_question(
        question.careerData,
        question.question
    )

    return {
        "answer": answer
    }