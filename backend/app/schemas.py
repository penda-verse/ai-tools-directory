from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ToolBase(BaseModel):
    name: str
    slug: str
    short_description: str
    description: str
    website_url: str
    pricing_model: Optional[str] = "Free"
    category: Optional[str] = None
    user_rating: Optional[float] = 0.0

class ToolCreate(ToolBase):
    pass

class Tool(ToolBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ContactMessageBase(BaseModel):
    name: str
    email: str
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
