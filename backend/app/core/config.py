import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Tools Directory"
    API_V1_STR: str = "/api/v1"
    # Using SQLite for local development so it runs out-of-the-box. 
    # To use PostgreSQL, change to: postgresql://user:password@localhost/dbname
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./ai_tools.db")
    
    class Config:
        env_file = ".env"

settings = Settings()
