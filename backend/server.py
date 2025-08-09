from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import our new modules
from database import connect_to_mongo, close_mongo_connection
from routes import auth, school, voting

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="Ignite & Inspire Karnataka", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Original routes for backward compatibility
@api_router.get("/")
async def root():
    return {"message": "Ignite & Inspire Karnataka API", "status": "running"}

# Include all route modules
app.include_router(auth.router)
app.include_router(school.router) 
app.include_router(voting.router)

# Include the original API router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()
    logger.info("Application startup complete")

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()
    logger.info("Application shutdown complete")
