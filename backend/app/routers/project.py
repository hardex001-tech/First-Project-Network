from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.project import Project
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectResponse
from app.core.auth import get_current_user

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Create a new project ticket. 
    Notice the Depends(get_current_user) - you MUST be logged in to do this!
    """
    new_project = Project(
        title=project.title,
        description=project.description,
        skills_required=project.skills_required,
        owner_id=current_user.id  # We automatically pull their ID from the security token!
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.get("/", response_model=List[ProjectResponse])
def get_all_projects(db: Session = Depends(get_db)):
    """
    Retrieve all active project tickets. Anyone can view this.
    """
    projects = db.query(Project).all()
    return projects

# --- UPDATE A PROJECT ---
@router.put("/{project_id}")
def update_project(project_id: int, project_update: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    project_query = db.query(Project).filter(Project.id == project_id)
    db_project = project_query.first()
    
    if not db_project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        
    if db_project.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to edit this project")
        
    project_query.update(project_update, synchronize_session=False)
    db.commit()
    
    return project_query.first()

# --- DELETE A PROJECT ---
@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    project_query = db.query(Project).filter(Project.id == project_id)
    db_project = project_query.first()
    
    if not db_project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        
    if db_project.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this project")
        
    project_query.delete(synchronize_session=False)
    db.commit()
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)