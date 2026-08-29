from app.routers import message
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

# Import our database connection, models, and routers
from app.core.database import get_db, engine, Base
from app.models import user, project
from app.routers import user as user_router
from app.routers import project as project_router

# Tell SQLAlchemy to physically create all tables in PostgreSQL
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Project-First Network API",
    description="The backend engine for the Project-First platform",
    version="0.1.0"
)

# --- PHASE 5: CORS CONFIGURATION ---
# We tell the API which frontend addresses are allowed to talk to it
origins = [
    "http://localhost:3000",      # Standard Next.js / React port
    "http://127.0.0.1:3000",      # Alternate localhost
    # You can add production URLs here later when you deploy!
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # Allows only the frontends listed above
    allow_credentials=True,       # Allows cookies and authentication headers (JWTs)
    allow_methods=["*"],          # Allows all methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],          # Allows all headers
)

# --- WIRE UP THE ROUTERS HERE ---
app.include_router(user_router.router)
app.include_router(project_router.router)
app.include_router(message.router)

@app.get("/health")
async def health_check(db: Session = Depends(get_db)):
    """Checks if the API is running and the database is connected."""
    try:
        db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception as e:
        db_status = f"disconnected: {str(e)}"

    return {
        "status": "healthy",
        "database": db_status,
        "message": "Project-First Network API is live!"
    }