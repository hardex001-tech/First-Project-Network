import os
import asyncio
import subprocess
from fastapi import FastAPI, HTTPException, Depends, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from prisma import Prisma
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta

# Security Configuration
SECRET_KEY = "super-secret-adexploit-key-change-in-production"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI(title="AdeXploit Engine API")
prisma = Prisma()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://first-project-network.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await prisma.connect()

@app.on_event("shutdown")
async def shutdown():
    await prisma.disconnect()

# --- AUTHENTICATION MODELS ---
class UserRegister(BaseModel):
    handle: str
    name: str
    password: str

class UserLogin(BaseModel):
    handle: str
    password: str

# --- EXISTING MODELS ---
class BountyCreate(BaseModel):
    issuer_handle: str
    title: str
    reward: int
    tags: List[str]

class MessageCreate(BaseModel):
    sender_handle: str
    receiver_handle: str
    text: str

# --------------------------------------------------
# AUTHENTICATION ENDPOINTS
# --------------------------------------------------
@app.post("/api/auth/register")
async def register_user(user: UserRegister):
    existing_user = await prisma.user.find_unique(where={"handle": user.handle})
    if existing_user:
        raise HTTPException(status_code=400, detail="Handle already registered")
    
    hashed_password = pwd_context.hash(user.password)
    
    new_user = await prisma.user.create(
        data={
            "handle": user.handle,
            "name": user.name,
            "passwordHash": hashed_password,
            "role": "Operator",
            "reputation": 100,
            "skills": ["Networking"]
        }
    )
    return {"message": "Node registered successfully", "handle": new_user.handle}

@app.post("/api/auth/login")
async def login_user(user: UserLogin):
    db_user = await prisma.user.find_unique(where={"handle": user.handle})
    if not db_user or not db_user.passwordHash:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not pwd_context.verify(user.password, db_user.passwordHash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate JWT Token
    expire = datetime.utcnow() + timedelta(hours=24)
    encoded_jwt = jwt.encode({"sub": db_user.handle, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)
    
    return {"access_token": encoded_jwt, "token_type": "bearer", "handle": db_user.handle}

# --------------------------------------------------
# EXISTING ENDPOINTS
# --------------------------------------------------
@app.get("/api/users")
async def get_users():
    return await prisma.user.find_many()

@app.get("/api/users/{handle}")
async def get_user_profile(handle: str):
    user = await prisma.user.find_unique(
        where={"handle": handle},
        include={"posts": True, "bounties": True}
    )
    if not user:
        raise HTTPException(status_code=404, detail="Node not found")
    return user

@app.get("/api/bounties")
async def get_bounties():
    return await prisma.bounty.find_many(
        include={"issuer": True},
        order={"createdAt": "desc"}
    )

@app.post("/api/bounties")
async def create_bounty(bounty: BountyCreate):
    issuer = await prisma.user.find_unique(where={"handle": bounty.issuer_handle})
    if not issuer:
        raise HTTPException(status_code=404, detail="Issuer not found")
    
    return await prisma.bounty.create(
        data={
            "title": bounty.title,
            "reward": bounty.reward,
            "tags": bounty.tags,
            "issuerId": issuer.id
        }
    )

@app.post("/api/messages")
async def send_message(msg: MessageCreate):
    sender = await prisma.user.find_unique(where={"handle": msg.sender_handle})
    receiver = await prisma.user.find_unique(where={"handle": msg.receiver_handle})
    
    if not sender or not receiver:
        raise HTTPException(status_code=404, detail="Node connection failed")
        
    return await prisma.message.create(
        data={
            "text": msg.text,
            "senderId": sender.id,
            "receiverId": receiver.id
        }
    )

# --------------------------------------------------
# LIVE LABS WEBSOCKET ENGINE
# --------------------------------------------------
@app.websocket("/api/ws/terminal")
async def websocket_terminal(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            command = await websocket.receive_text()
            if not command.strip():
                await websocket.send_text("\r\n$ ")
                continue
            
            # Helper function to run the command synchronously
            def run_sync_subprocess(cmd):
                return subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            # Offload the synchronous execution to a background thread
            result = await asyncio.to_thread(run_sync_subprocess, command)
            
            if result.stdout:
                # xterm.js requires \r\n for proper line breaks
                formatted_out = result.stdout.replace('\n', '\r\n')
                await websocket.send_text(f"\r\n{formatted_out}")
            
            if result.stderr:
                formatted_err = result.stderr.replace('\n', '\r\n')
                # Wrap errors in ANSI red text for visibility
                await websocket.send_text(f"\r\n\x1b[31m{formatted_err}\x1b[0m")
            
            await websocket.send_text("\r\n$ ")
            
    except WebSocketDisconnect:
        print("Terminal node disconnected")