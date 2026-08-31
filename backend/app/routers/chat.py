from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.websockets import manager

router = APIRouter(
    prefix="/chat",
    tags=["Real-Time Chat"]
)

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    await manager.broadcast(f"System: Network ID #{client_id} joined the secure channel.")
    
    try:
        while True:
            # The server stays awake here, listening for incoming messages
            data = await websocket.receive_text()
            await manager.broadcast(f"User #{client_id}: {data}")
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"System: Network ID #{client_id} disconnected.")