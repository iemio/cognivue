# app/database/models.py
import uuid
from sqlalchemy import Column, Integer, String
from app.database.config import Base
from sqlalchemy.dialects.postgresql import UUID
from typing import Optional
class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
