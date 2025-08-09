from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import Optional
import os

class Database:
    client: Optional[AsyncIOMotorClient] = None
    database: Optional[AsyncIOMotorDatabase] = None

db = Database()

async def connect_to_mongo():
    """Create database connection"""
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ.get('DB_NAME', 'ignite_inspire_karnataka')
    
    db.client = AsyncIOMotorClient(mongo_url)
    db.database = db.client[db_name]
    
    print(f"Connected to MongoDB: {db_name}")

async def close_mongo_connection():
    """Close database connection"""
    if db.client:
        db.client.close()
        print("Disconnected from MongoDB")

def get_database() -> AsyncIOMotorDatabase:
    """Get database instance"""
    return db.database

# Collection helpers
def get_collection(collection_name: str):
    """Get a specific collection"""
    database = get_database()
    return database[collection_name]

# Collection names
COLLECTIONS = {
    "schools": "schools",
    "admins": "admins", 
    "evaluators": "evaluators",
    "drawing_participants": "drawing_participants",
    "teacher_nominations": "teacher_nominations",
    "voting_tokens": "voting_tokens",
    "votes": "votes"
}