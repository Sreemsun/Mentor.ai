from pydantic import BaseModel

class PlacementRequest(BaseModel):
    degree: str
    year: str
    skills: str
    interests: str
    targetRole: str