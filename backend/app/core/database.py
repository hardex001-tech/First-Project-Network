from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# 1. The Engine: This manages the physical connection to PostgreSQL
engine = create_engine(settings.DATABASE_URL)

# 2. The Session: A factory that creates temporary database workspaces for each request
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 3. The Base: All our future database tables (like ProjectTicket) will inherit from this
Base = declarative_base()

# 4. Dependency Injection: Hands a database session to a route, and safely closes it afterward
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()