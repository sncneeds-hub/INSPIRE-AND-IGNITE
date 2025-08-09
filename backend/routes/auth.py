from fastapi import APIRouter, HTTPException, status, Depends
from models import (
    SchoolRegistrationRequest, LoginRequest, LoginResponse, 
    SchoolUser, AdminUser, UserRole
)
from auth import get_password_hash, verify_password, create_access_token, verify_token
from database import get_collection, COLLECTIONS
from datetime import timedelta
import logging

router = APIRouter(prefix="/api/auth", tags=["authentication"])
logger = logging.getLogger(__name__)

@router.post("/school/register", response_model=dict)
async def register_school(registration: SchoolRegistrationRequest):
    """Register a new school user"""
    try:
        schools_collection = get_collection(COLLECTIONS["schools"])
        
        # Check if email already exists
        existing_school = await schools_collection.find_one({"email": registration.email})
        if existing_school:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Hash password and create school user
        password_hash = get_password_hash(registration.password)
        
        school_data = SchoolUser(
            school_name=registration.school_name,
            authorized_person_name=registration.authorized_person_name,
            email=registration.email,
            password_hash=password_hash,
            phone=registration.phone,
            address=registration.address,
            district=registration.district,
            taluk=registration.taluk,
            udise_code=registration.udise_code,
            principal_name=registration.principal_name
        )
        
        # Insert into database
        result = await schools_collection.insert_one(school_data.dict())
        
        if result.inserted_id:
            return {
                "message": "School registered successfully",
                "school_id": school_data.id,
                "status": "success"
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to register school"
            )
            
    except Exception as e:
        logger.error(f"School registration error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error during registration"
        )

@router.post("/school/login", response_model=LoginResponse)
async def login_school(login: LoginRequest):
    """Login school user"""
    try:
        schools_collection = get_collection(COLLECTIONS["schools"])
        
        # Find school by email
        school = await schools_collection.find_one({"email": login.email})
        
        if not school or not verify_password(login.password, school["password_hash"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        if not school.get("is_active", True):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Account is deactivated"
            )
        
        # Create access token
        access_token_expires = timedelta(hours=24)
        access_token = create_access_token(
            data={"sub": school["id"], "user_type": UserRole.SCHOOL.value},
            expires_delta=access_token_expires
        )
        
        return LoginResponse(
            access_token=access_token,
            user_id=school["id"],
            user_type=UserRole.SCHOOL,
            school_name=school["school_name"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"School login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error during login"
        )

@router.post("/admin/login", response_model=LoginResponse)
async def login_admin(login: LoginRequest):
    """Login admin user"""
    try:
        admins_collection = get_collection(COLLECTIONS["admins"])
        
        # Find admin by email
        admin = await admins_collection.find_one({"email": login.email})
        
        if not admin or not verify_password(login.password, admin["password_hash"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        if not admin.get("is_active", True):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Account is deactivated"
            )
        
        # Create access token
        access_token_expires = timedelta(hours=24)
        access_token = create_access_token(
            data={"sub": admin["id"], "user_type": UserRole.ADMIN.value},
            expires_delta=access_token_expires
        )
        
        return LoginResponse(
            access_token=access_token,
            user_id=admin["id"],
            user_type=UserRole.ADMIN
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Admin login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error during login"
        )

@router.get("/profile")
async def get_profile(current_user: dict = Depends(verify_token)):
    """Get current user profile"""
    try:
        user_type = current_user["user_type"]
        user_id = current_user["user_id"]
        
        if user_type == UserRole.SCHOOL.value:
            collection = get_collection(COLLECTIONS["schools"])
        elif user_type == UserRole.ADMIN.value:
            collection = get_collection(COLLECTIONS["admins"])
        elif user_type == UserRole.EVALUATOR.value:
            collection = get_collection(COLLECTIONS["evaluators"])
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid user type"
            )
        
        user = await collection.find_one({"id": user_id})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Remove sensitive data
        user.pop("password_hash", None)
        user.pop("_id", None)
        
        return {"user": user, "status": "success"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Profile fetch error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.post("/logout")
async def logout(current_user: dict = Depends(verify_token)):
    """Logout user (client should discard token)"""
    return {"message": "Logged out successfully", "status": "success"}