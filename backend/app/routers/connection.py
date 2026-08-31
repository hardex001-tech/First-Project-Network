from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.connection import Connection
from app.models.user import User
from app.schemas.connection import ConnectionResponse
from app.core.auth import get_current_user

router = APIRouter(
    prefix="/connections",
    tags=["Social Graph"]
)

@router.post("/{target_user_id}", response_model=ConnectionResponse, status_code=status.HTTP_201_CREATED)
def follow_user(
    target_user_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    if current_user.id == target_user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Cannot connect with yourself."
        )

    target_user = db.query(User).filter(User.id == target_user_id).first()
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Target user not found."
        )

    existing_connection = db.query(Connection).filter(
        Connection.follower_id == current_user.id,
        Connection.following_id == target_user_id
    ).first()

    if existing_connection:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Already connected with this user."
        )

    new_connection = Connection(
        follower_id=current_user.id,
        following_id=target_user_id
    )
    db.add(new_connection)
    db.commit()
    db.refresh(new_connection)
    return new_connection

@router.delete("/{target_user_id}", status_code=status.HTTP_204_NO_CONTENT)
def unfollow_user(
    target_user_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    connection_query = db.query(Connection).filter(
        Connection.follower_id == current_user.id,
        Connection.following_id == target_user_id
    )

    connection = connection_query.first()
    if not connection:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Connection does not exist."
        )

    connection_query.delete(synchronize_session=False)
    db.commit()
    return None

@router.get("/following", response_model=List[ConnectionResponse])
def get_following(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    return db.query(Connection).filter(Connection.follower_id == current_user.id).all()

@router.get("/followers", response_model=List[ConnectionResponse])
def get_followers(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    return db.query(Connection).filter(Connection.following_id == current_user.id).all()