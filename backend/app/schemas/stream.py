from pydantic import BaseModel
from typing import Optional

class StreamCreate(BaseModel):
    title: str
    description: Optional[str] = None
    tags: Optional[str] = None

class WebRTCSignal(BaseModel):
    type: str
    sdp: Optional[str] = None
    candidate: Optional[dict] = None