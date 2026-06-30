from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app import schemas, models
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.Tool])
def read_tools(
    skip: int = 0, 
    limit: int = 100, 
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Tool)
    if category:
        query = query.filter(models.Tool.category == category)
    if search:
        query = query.filter(models.Tool.name.ilike(f"%{search}%") | models.Tool.description.ilike(f"%{search}%"))
    
    tools = query.offset(skip).limit(limit).all()
    return tools

@router.get("/{slug}", response_model=schemas.Tool)
def read_tool(slug: str, db: Session = Depends(get_db)):
    tool = db.query(models.Tool).filter(models.Tool.slug == slug).first()
    if tool is None:
        raise HTTPException(status_code=404, detail="Tool not found")
    return tool

@router.post("/", response_model=schemas.Tool)
def create_tool(tool: schemas.ToolCreate, db: Session = Depends(get_db)):
    db_tool = db.query(models.Tool).filter(models.Tool.name == tool.name).first()
    if db_tool:
        raise HTTPException(status_code=400, detail="Tool already registered")
    
    new_tool = models.Tool(**tool.model_dump())
    db.add(new_tool)
    db.commit()
    db.refresh(new_tool)
    return new_tool
