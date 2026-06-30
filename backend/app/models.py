import uuid
from sqlalchemy import Column, String, Text, Float, DateTime, func
from app.database import Base

class Tool(Base):
    __tablename__ = "tools"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    short_description = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    website_url = Column(String, nullable=False)
    pricing_model = Column(String, default="Free")
    category = Column(String, index=True)
    user_rating = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
