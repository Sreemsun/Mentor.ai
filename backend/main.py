from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.placement import router as placement_router
from routes.project import router as project_router
from routes.placement_chat import router as placement_chat_router


app = FastAPI()

app.include_router(
    placement_chat_router,
    prefix="/api/placement"
)
app.include_router(
    placement_router,
    prefix="/api/placement",
    tags=["Placement Mentor"]
)

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