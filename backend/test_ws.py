import asyncio
import websockets

async def test_chat():
    uri = "ws://127.0.0.1:8000/chat/ws/777"
    
    # Open the real-time pipe
    async with websockets.connect(uri) as websocket:
        
        # 1. Catch the system join message
        join_msg = await websocket.recv()
        print(f"Server: {join_msg}")
        
        # 2. Fire a payload into the socket
        payload = "Initiating red-team protocol..."
        await websocket.send(payload)
        print(f"You Sent: {payload}")
        
        # 3. Catch the network broadcast
        broadcast_msg = await websocket.recv()
        print(f"Server: {broadcast_msg}")

asyncio.run(test_chat())