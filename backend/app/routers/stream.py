from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict, List

router = APIRouter(
    prefix="/stream",
    tags=["Live WebRTC Stream"]
)

class StreamManager:
    def __init__(self):
        # Maps a room ID to a list of connected WebSockets
        self.rooms: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        if room_id not in self.rooms:
            self.rooms[room_id] = []
        self.rooms[room_id].append(websocket)

    def disconnect(self, websocket: WebSocket, room_id: str):
        if room_id in self.rooms and websocket in self.rooms[room_id]:
            self.rooms[room_id].remove(websocket)
            if not self.rooms[room_id]:
                del self.rooms[room_id]

    async def broadcast_signal(self, message: str, room_id: str, sender: WebSocket):
        # WebRTC signals (SDP offers/answers, ICE candidates) must not be echoed back to the sender
        if room_id in self.rooms:
            for connection in self.rooms[room_id]:
                if connection != sender:
                    await connection.send_text(message)

stream_manager = StreamManager()

@router.websocket("/ws/{room_id}/{client_id}")
async def stream_signaling(websocket: WebSocket, room_id: str, client_id: str):
    await stream_manager.connect(websocket, room_id)
    try:
        while True:
            # The server catches the WebRTC handshake data and passes it to the peer
            data = await websocket.receive_text()
            await stream_manager.broadcast_signal(data, room_id, sender=websocket)
            
    except WebSocketDisconnect:
        stream_manager.disconnect(websocket, room_id)