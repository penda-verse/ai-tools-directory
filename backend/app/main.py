from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.routers import tools, contact
from app.database import engine, Base
from app.core.limiter import limiter

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Tools Directory API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tools.router, prefix="/api/v1/tools", tags=["tools"])
app.include_router(contact.router, prefix="/api/v1/contact", tags=["contact"])

@app.get("/")
def root():
    return {"message": "Welcome to the AI Tools Directory API"}
