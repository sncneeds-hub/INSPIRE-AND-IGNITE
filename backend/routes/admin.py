from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from models import AdminDashboardStats, EvaluatorUser, AdminUser, UserRole
from auth import require_admin_user, get_password_hash
from database import get_collection, COLLECTIONS
import logging
from datetime import datetime

router = APIRouter(prefix="/api/admin", tags=["admin"])
logger = logging.getLogger(__name__)

@router.get("/dashboard", response_model=AdminDashboardStats)
async def get_admin_dashboard(current_user: dict = Depends(require_admin_user)):
    """Get admin dashboard statistics"""
    try:
        schools_collection = get_collection(COLLECTIONS["schools"])
        participants_collection = get_collection(COLLECTIONS["drawing_participants"])
        nominations_collection = get_collection(COLLECTIONS["teacher_nominations"])
        evaluators_collection = get_collection(COLLECTIONS["evaluators"])
        votes_collection = get_collection(COLLECTIONS["votes"])
        
        # Get counts
        total_schools = await schools_collection.count_documents({"is_active": True})
        total_nominations = await nominations_collection.count_documents({})
        active_evaluators = await evaluators_collection.count_documents({"is_active": True})
        votes_cast = await votes_collection.count_documents({})
        
        # Get participants count
        participants = await participants_collection.find({}).to_list(1000)
        total_participants = sum(p.get("participant_count", 0) for p in participants)
        
        # Competitions by level
        competitions_by_level = {}
        for participant in participants:
            level = participant.get("level", "unknown")
            competitions_by_level[level] = competitions_by_level.get(level, 0) + 1
        
        return AdminDashboardStats(
            total_schools=total_schools,
            total_participants=total_participants,
            total_nominations=total_nominations,
            active_evaluators=active_evaluators,
            votes_cast=votes_cast,
            competitions_by_level=competitions_by_level
        )
        
    except Exception as e:
        logger.error(f"Admin dashboard error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch admin dashboard data"
        )

@router.post("/evaluators")
async def create_evaluator(
    evaluator_data: dict,
    current_user: dict = Depends(require_admin_user)
):
    """Create a new evaluator account"""
    try:
        evaluators_collection = get_collection(COLLECTIONS["evaluators"])
        
        # Check if email already exists
        existing = await evaluators_collection.find_one({"email": evaluator_data.get("email")})
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Hash password
        password_hash = get_password_hash(evaluator_data.get("password"))
        
        # Create evaluator
        evaluator = EvaluatorUser(
            name=evaluator_data.get("name"),
            email=evaluator_data.get("email"),
            password_hash=password_hash,
            expertise=evaluator_data.get("expertise"),
            assigned_categories=evaluator_data.get("assigned_categories", []),
            assigned_levels=evaluator_data.get("assigned_levels", []),
            created_by=current_user["user_id"]
        )
        
        result = await evaluators_collection.insert_one(evaluator.dict())
        
        if result.inserted_id:
            return {
                "message": "Evaluator created successfully",
                "evaluator_id": evaluator.id,
                "status": "success"
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create evaluator"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Evaluator creation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create evaluator"
        )

@router.get("/evaluators")
async def get_evaluators(current_user: dict = Depends(require_admin_user)):
    """Get all evaluators"""
    try:
        evaluators_collection = get_collection(COLLECTIONS["evaluators"])
        
        evaluators = await evaluators_collection.find({}).to_list(100)
        
        # Clean up data
        for evaluator in evaluators:
            evaluator.pop("_id", None)
            evaluator.pop("password_hash", None)
        
        return {
            "evaluators": evaluators,
            "count": len(evaluators),
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Evaluators fetch error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch evaluators"
        )

@router.get("/all-participants")
async def get_all_participants(current_user: dict = Depends(require_admin_user)):
    """Get all participants from all schools"""
    try:
        participants_collection = get_collection(COLLECTIONS["drawing_participants"])
        schools_collection = get_collection(COLLECTIONS["schools"])
        
        participants = await participants_collection.find({}).to_list(1000)
        
        # Enrich with school information
        enriched_participants = []
        for participant in participants:
            school = await schools_collection.find_one({"id": participant.get("school_id")})
            
            participant_info = {
                **participant,
                "school_name": school.get("school_name") if school else "Unknown School",
                "district": school.get("district") if school else "Unknown District",
                "taluk": school.get("taluk") if school else "Unknown Taluk"
            }
            participant_info.pop("_id", None)
            enriched_participants.append(participant_info)
        
        return {
            "participants": enriched_participants,
            "count": len(enriched_participants),
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"All participants fetch error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch all participants"
        )

@router.get("/all-nominations")
async def get_all_nominations(current_user: dict = Depends(require_admin_user)):
    """Get all teacher nominations from all schools"""
    try:
        nominations_collection = get_collection(COLLECTIONS["teacher_nominations"])
        schools_collection = get_collection(COLLECTIONS["schools"])
        
        nominations = await nominations_collection.find({}).to_list(1000)
        
        # Enrich with school information
        enriched_nominations = []
        for nomination in nominations:
            school = await schools_collection.find_one({"id": nomination.get("school_id")})
            
            nomination_info = {
                **nomination,
                "school_name": school.get("school_name") if school else "Unknown School",
                "district": school.get("district") if school else "Unknown District",
                "taluk": school.get("taluk") if school else "Unknown Taluk"
            }
            nomination_info.pop("_id", None)
            enriched_nominations.append(nomination_info)
        
        return {
            "nominations": enriched_nominations,
            "count": len(enriched_nominations),
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"All nominations fetch error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch all nominations"
        )

# Seed admin user (run once)
@router.post("/seed-admin")
async def seed_admin():
    """Create default admin user (for initial setup)"""
    try:
        admins_collection = get_collection(COLLECTIONS["admins"])
        
        # Check if admin already exists
        existing_admin = await admins_collection.find_one({"email": "admin@igniteinspire.com"})
        if existing_admin:
            return {"message": "Admin user already exists", "status": "exists"}
        
        # Create default admin
        password_hash = get_password_hash("admin123")  # Change this password!
        
        admin = AdminUser(
            name="System Administrator",
            email="admin@igniteinspire.com",
            password_hash=password_hash,
            permissions=["all"]
        )
        
        result = await admins_collection.insert_one(admin.dict())
        
        if result.inserted_id:
            return {
                "message": "Admin user created successfully",
                "email": "admin@igniteinspire.com",
                "default_password": "admin123",
                "warning": "Please change the default password immediately!",
                "status": "success"
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create admin user"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Admin seeding error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create admin user"
        )