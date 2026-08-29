from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
# We import relationship to help SQLAlchemy link tables together later
from sqlalchemy.orm import relationship 

from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=False)
    # For our MVP, we'll store skills as a simple comma-separated string (e.g., "React, Python, Figma")
    skills_required = Column(String) 
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # The Foreign Key: This links the project to the user who created it
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # This creates a virtual bridge back to the User model
    owner = relationship("User")