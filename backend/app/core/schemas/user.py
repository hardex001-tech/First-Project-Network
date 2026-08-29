from pydantic import BaseModel

# 1. What we expect the user to send us when registering
class UserCreate(BaseModel):
    email: str
    username: str
    password: str

# 2. What we send back to the user (notice there is no password here!)
class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    is_active: bool

    class Config:
        from_attributes = True # This tells Pydantic to read data directly from our SQLAlchemy database model