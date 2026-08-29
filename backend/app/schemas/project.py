from pydantic import BaseModel
from datetime import datetime

# What the user sends us
class ProjectCreate(BaseModel):
    title: str
    description: str
    skills_required: str

# What we send back
class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str
    skills_required: str
    is_active: bool
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True