from pydantic import BaseModel
from datetime import datetime

class ChatMessageCreate(BaseModel):
    room_id: str
    content: str

class ChatMessageResponse(BaseModel):
    id: int
    sender_id: int
    room_id: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True