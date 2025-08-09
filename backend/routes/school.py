from fastapi import APIRouter, HTTPException, status, Depends
from typing import List, Dict
from models import (
    ParticipantRegistrationRequest, WinnerSubmissionRequest, 
    TeacherNominationRequest, SchoolDashboardStats,
    DrawingParticipant, TeacherNomination, DrawingCategory, CompetitionLevel
)
from auth import require_school_user
from database import get_collection, COLLECTIONS
import logging
from datetime import datetime

router = APIRouter(prefix="/api/school", tags=["school"])
logger = logging.getLogger(__name__)

@router.get("/dashboard", response_model=SchoolDashboardStats)
async def get_school_dashboard(current_user: dict = Depends(require_school_user)):
    """Get school dashboard statistics"""
    try:
        school_id = current_user["user_id"]
        
        # Get drawing participants
        participants_collection = get_collection(COLLECTIONS["drawing_participants"])
        participants = await participants_collection.find({"school_id": school_id}).to_list(100)
        
        # Get teacher nominations
        nominations_collection = get_collection(COLLECTIONS["teacher_nominations"])
        nominations = await nominations_collection.find({"school_id": school_id}).to_list(100)
        
        # Calculate stats
        total_participants = sum(p.get("participant_count", 0) for p in participants)
        categories_registered = list(set(p.get("category") for p in participants))
        winners_submitted = sum(1 for p in participants if p.get("winners"))
        teacher_nominations_count = len(nominations)
        
        # Determine current competition level
        current_level = "school"  # Default, can be made dynamic based on dates
        
        return SchoolDashboardStats(
            total_participants=total_participants,
            categories_registered=categories_registered,
            winners_submitted=winners_submitted,
            teacher_nominations=teacher_nominations_count,
            current_level=current_level
        )
        
    except Exception as e:
        logger.error(f"Dashboard error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch dashboard data"
        )

@router.post("/participants/register")
async def register_participants(
    registration: ParticipantRegistrationRequest,
    current_user: dict = Depends(require_school_user)
):
    """Register participant counts by category"""
    try:
        school_id = current_user["user_id"]
        participants_collection = get_collection(COLLECTIONS["drawing_participants"])
        
        registered_participants = []
        
        for category, count in registration.participants.items():
            if count > 0:  # Only register if count is greater than 0
                # Check if already registered for this category and level
                existing = await participants_collection.find_one({
                    "school_id": school_id,
                    "category": category.value,
                    "level": registration.level.value
                })
                
                if existing:
                    # Update existing registration
                    await participants_collection.update_one(
                        {"_id": existing["_id"]},
                        {"$set": {
                            "participant_count": count,
                            "updated_at": datetime.utcnow()
                        }}
                    )
                    registered_participants.append({
                        "category": category.value,
                        "count": count,
                        "action": "updated"
                    })
                else:
                    # Create new registration
                    participant_data = DrawingParticipant(
                        school_id=school_id,
                        category=category,
                        level=registration.level,
                        participant_count=count
                    )
                    
                    await participants_collection.insert_one(participant_data.dict())
                    registered_participants.append({
                        "category": category.value,
                        "count": count,
                        "action": "registered"
                    })
        
        return {
            "message": "Participants registered successfully",
            "participants": registered_participants,
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Participant registration error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to register participants"
        )

@router.post("/participants/winners")
async def submit_winners(
    submission: WinnerSubmissionRequest,
    current_user: dict = Depends(require_school_user)
):
    """Submit winners for next level progression"""
    try:
        school_id = current_user["user_id"]
        participants_collection = get_collection(COLLECTIONS["drawing_participants"])
        
        # Find existing participant registration
        participant = await participants_collection.find_one({
            "school_id": school_id,
            "category": submission.category.value,
            "level": submission.level.value
        })
        
        if not participant:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No participant registration found for this category and level"
            )
        
        # Update with winners
        winners_data = [winner.dict() for winner in submission.winners]
        
        await participants_collection.update_one(
            {"_id": participant["_id"]},
            {"$set": {
                "winners": winners_data,
                "is_completed": True,
                "updated_at": datetime.utcnow()
            }}
        )
        
        # Create entries for next level if winners advance
        next_level_map = {
            CompetitionLevel.SCHOOL: CompetitionLevel.TALUK,
            CompetitionLevel.TALUK: CompetitionLevel.DISTRICT,
            CompetitionLevel.DISTRICT: CompetitionLevel.STATE
        }
        
        if submission.level in next_level_map:
            next_level = next_level_map[submission.level]
            advancing_winners = [w for w in submission.winners if w.advances_to_next]
            
            if advancing_winners:
                # Check if next level entry exists
                next_level_entry = await participants_collection.find_one({
                    "school_id": school_id,
                    "category": submission.category.value,
                    "level": next_level.value
                })
                
                if not next_level_entry:
                    # Create next level entry
                    next_participant = DrawingParticipant(
                        school_id=school_id,
                        category=submission.category,
                        level=next_level,
                        participant_count=len(advancing_winners),
                        from_previous_level=True,
                        advanced_from=submission.level
                    )
                    
                    await participants_collection.insert_one(next_participant.dict())
        
        return {
            "message": "Winners submitted successfully",
            "category": submission.category.value,
            "level": submission.level.value,
            "winners_count": len(submission.winners),
            "status": "success"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Winner submission error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit winners"
        )

@router.post("/teacher-nominations")
async def nominate_teacher(
    nomination: TeacherNominationRequest,
    current_user: dict = Depends(require_school_user)
):
    """Nominate a teacher for awards"""
    try:
        school_id = current_user["user_id"]
        nominations_collection = get_collection(COLLECTIONS["teacher_nominations"])
        
        # Create teacher nomination
        nomination_data = TeacherNomination(
            school_id=school_id,
            teacher_name=nomination.teacher_name,
            category=nomination.category,
            award_type=nomination.award_type,
            email=nomination.email,
            phone=nomination.phone,
            experience_years=nomination.experience_years,
            current_position=nomination.current_position,
            qualifications=nomination.qualifications,
            subjects_taught=nomination.subjects_taught,
            achievements=nomination.achievements,
            nomination_letter=nomination.nomination_letter
        )
        
        result = await nominations_collection.insert_one(nomination_data.dict())
        
        if result.inserted_id:
            return {
                "message": "Teacher nominated successfully",
                "nomination_id": nomination_data.id,
                "teacher_name": nomination.teacher_name,
                "category": nomination.category.value,
                "status": "success"
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create nomination"
            )
            
    except Exception as e:
        logger.error(f"Teacher nomination error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to nominate teacher"
        )

@router.get("/participants")
async def get_participants(current_user: dict = Depends(require_school_user)):
    """Get all participants registered by school"""
    try:
        school_id = current_user["user_id"]
        participants_collection = get_collection(COLLECTIONS["drawing_participants"])
        
        participants = await participants_collection.find(
            {"school_id": school_id}
        ).to_list(100)
        
        # Clean up MongoDB ObjectId
        for participant in participants:
            participant.pop("_id", None)
        
        return {
            "participants": participants,
            "count": len(participants),
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Participants fetch error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch participants"
        )

@router.get("/teacher-nominations")
async def get_teacher_nominations(current_user: dict = Depends(require_school_user)):
    """Get all teacher nominations by school"""
    try:
        school_id = current_user["user_id"]
        nominations_collection = get_collection(COLLECTIONS["teacher_nominations"])
        
        nominations = await nominations_collection.find(
            {"school_id": school_id}
        ).to_list(100)
        
        # Clean up MongoDB ObjectId
        for nomination in nominations:
            nomination.pop("_id", None)
        
        return {
            "nominations": nominations,
            "count": len(nominations),
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Nominations fetch error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch nominations"
        )