from pydantic import BaseModel
from datetime import datetime

class ConnectionCreate(BaseModel):
    following_id: int

class ConnectionResponse(BaseModel):
    id: int
    follower_id: int
    following_id: int
    created_at: datetime

    class Config:
        from_attributes = True