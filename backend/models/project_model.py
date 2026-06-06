from pydantic import BaseModel

class ProjectRequest(BaseModel):
    projectIdea: str
    experienceLevel: str
