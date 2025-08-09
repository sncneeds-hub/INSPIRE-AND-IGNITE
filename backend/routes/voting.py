from fastapi import APIRouter, HTTPException, status, Request
from models import VoteRequest, TokenValidationRequest, VotingToken, Vote
from database import get_collection, COLLECTIONS
from datetime import datetime, timedelta
import logging
import uuid

router = APIRouter(prefix="/api/voting", tags=["voting"])
logger = logging.getLogger(__name__)

@router.post("/validate-token")
async def validate_voting_token(token_request: TokenValidationRequest):
    """Validate a voting token"""
    try:
        tokens_collection = get_collection(COLLECTIONS["voting_tokens"])
        
        # Find token
        token_doc = await tokens_collection.find_one({"token": token_request.token.upper()})
        
        if not token_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid voting token"
            )
        
        # Check if token is already used
        if token_doc.get("is_used", False):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This token has already been used"
            )
        
        # Check if token is expired
        if datetime.utcnow() > token_doc.get("expires_at"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This token has expired"
            )
        
        return {
            "message": "Token is valid",
            "token": token_request.token,
            "status": "valid"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Token validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to validate token"
        )

@router.post("/cast-vote")
async def cast_vote(vote_request: VoteRequest, request: Request):
    """Cast a vote using token"""
    try:
        tokens_collection = get_collection(COLLECTIONS["voting_tokens"])
        votes_collection = get_collection(COLLECTIONS["votes"])
        nominations_collection = get_collection(COLLECTIONS["teacher_nominations"])
        
        # Validate token first
        token_doc = await tokens_collection.find_one({"token": vote_request.token.upper()})
        
        if not token_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid voting token"
            )
        
        if token_doc.get("is_used", False):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This token has already been used"
            )
        
        if datetime.utcnow() > token_doc.get("expires_at"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This token has expired"
            )
        
        # Check if nomination exists
        nomination = await nominations_collection.find_one({"id": vote_request.nomination_id})
        if not nomination:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Nomination not found"
            )
        
        # Get client IP
        client_ip = request.client.host
        user_agent = request.headers.get("user-agent", "")
        
        # Create vote record
        vote_data = Vote(
            token_id=token_doc["id"],
            nomination_id=vote_request.nomination_id,
            ip_address=client_ip,
            user_agent=user_agent
        )
        
        # Insert vote
        await votes_collection.insert_one(vote_data.dict())
        
        # Mark token as used
        await tokens_collection.update_one(
            {"_id": token_doc["_id"]},
            {"$set": {
                "is_used": True,
                "nomination_id": vote_request.nomination_id,
                "voted_at": datetime.utcnow(),
                "ip_address": client_ip
            }}
        )
        
        # Update nomination vote count
        await nominations_collection.update_one(
            {"id": vote_request.nomination_id},
            {"$inc": {"public_votes": 1}}
        )
        
        return {
            "message": "Vote cast successfully",
            "vote_id": vote_data.id,
            "nomination_id": vote_request.nomination_id,
            "status": "success"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Vote casting error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to cast vote"
        )

@router.get("/results/{nomination_id}")
async def get_voting_results(nomination_id: str):
    """Get voting results for a specific nomination"""
    try:
        nominations_collection = get_collection(COLLECTIONS["teacher_nominations"])
        
        nomination = await nominations_collection.find_one({"id": nomination_id})
        
        if not nomination:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Nomination not found"
            )
        
        return {
            "nomination_id": nomination_id,
            "teacher_name": nomination.get("teacher_name"),
            "category": nomination.get("category"),
            "award_type": nomination.get("award_type"),
            "public_votes": nomination.get("public_votes", 0),
            "status": nomination.get("status", "nominated")
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Results fetch error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch voting results"
        )

@router.get("/nominations")
async def get_nominations_for_voting():
    """Get all nominations available for public voting"""
    try:
        nominations_collection = get_collection(COLLECTIONS["teacher_nominations"])
        schools_collection = get_collection(COLLECTIONS["schools"])
        
        # Get all active nominations
        nominations = await nominations_collection.find(
            {"status": {"$in": ["nominated", "shortlisted"]}}
        ).to_list(100)
        
        # Enrich with school information
        enriched_nominations = []
        for nomination in nominations:
            # Get school details
            school = await schools_collection.find_one({"id": nomination.get("school_id")})
            
            nomination_info = {
                "nomination_id": nomination.get("id"),
                "teacher_name": nomination.get("teacher_name"),
                "category": nomination.get("category"),
                "award_type": nomination.get("award_type"),
                "school_name": school.get("school_name") if school else "Unknown School",
                "district": school.get("district") if school else "Unknown District",
                "experience_years": nomination.get("experience_years"),
                "current_position": nomination.get("current_position"),
                "achievements": nomination.get("achievements", "")[:200] + "..." if len(nomination.get("achievements", "")) > 200 else nomination.get("achievements", ""),
                "public_votes": nomination.get("public_votes", 0),
                "status": nomination.get("status", "nominated")
            }
            enriched_nominations.append(nomination_info)
        
        return {
            "nominations": enriched_nominations,
            "count": len(enriched_nominations),
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Nominations fetch error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch nominations"
        )

# Admin endpoint to generate voting tokens (will be moved to admin routes later)
@router.post("/generate-tokens")
async def generate_voting_tokens(count: int = 100):
    """Generate voting tokens (Admin only - temporary endpoint)"""
    try:
        tokens_collection = get_collection(COLLECTIONS["voting_tokens"])
        
        # Generate tokens
        tokens = []
        expires_at = datetime.utcnow() + timedelta(days=90)  # 90 days validity
        
        for _ in range(count):
            token_data = VotingToken(expires_at=expires_at)
            tokens.append(token_data.dict())
        
        # Insert tokens
        result = await tokens_collection.insert_many(tokens)
        
        # Return generated tokens
        generated_tokens = [token["token"] for token in tokens]
        
        return {
            "message": f"Generated {count} voting tokens",
            "tokens": generated_tokens,
            "expires_at": expires_at.isoformat(),
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Token generation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate tokens"
        )