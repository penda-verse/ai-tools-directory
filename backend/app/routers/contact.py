from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app import schemas, models
from app.database import get_db
from app.core.limiter import limiter

router = APIRouter()

@router.post("/", response_model=schemas.ContactMessage)
@limiter.limit("5/minute")
def create_contact_message(
    request: Request,
    message: schemas.ContactMessageCreate, 
    db: Session = Depends(get_db)
):
    new_message = models.ContactMessage(**message.model_dump())
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message
