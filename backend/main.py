from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.project import router as project_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    project_router,
    prefix="/api/project",
    tags=["Project Mentor"]
)

@app.get("/")
def home():
    return {
        "message": "LaunchPad AI Backend Running"
    }