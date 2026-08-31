from sqlalchemy import Column, Integer, ForeignKey, TIMESTAMP, UniqueConstraint
from sqlalchemy.sql.expression import text
from app.core.database import Base

class Connection(Base):
    __tablename__ = "connections"

    id = Column(Integer, primary_key=True, nullable=False)
    follower_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    following_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

    __table_args__ = (
        UniqueConstraint('follower_id', 'following_id', name='unique_follower_following'),
    )