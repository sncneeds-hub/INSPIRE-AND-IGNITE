from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

# Enums for better type safety
class UserRole(str, Enum):
    SCHOOL = "school"
    ADMIN = "admin"
    EVALUATOR = "evaluator"

class CompetitionLevel(str, Enum):
    SCHOOL = "school"
    TALUK = "taluk"
    DISTRICT = "district"
    STATE = "state"

class DrawingCategory(str, Enum):
    PRE_SCHOOL = "pre-school"
    JUNIOR_ARTISTS = "junior-artists"
    YOUNG_CREATORS = "young-creators"
    ASPIRING_INNOVATORS = "aspiring-innovators"
    MASTER_VISIONARIES = "master-visionaries"

class TeacherAwardCategory(str, Enum):
    LIFETIME_EXCELLENCE = "lifetime-excellence"
    INSPIRATIONAL_TEACHING = "inspirational-teaching"
    ACADEMIC_EXCELLENCE = "academic-excellence"
    INNOVATION_GROWTH = "innovation-growth"
    SOCIAL_CONTRIBUTION = "social-contribution"

class NominationStatus(str, Enum):
    NOMINATED = "nominated"
    SHORTLISTED = "shortlisted"
    WINNER = "winner"
    REJECTED = "rejected"

# Base Models
class BaseDocument(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# User Models
class SchoolUser(BaseDocument):
    school_name: str
    authorized_person_name: str
    email: EmailStr
    password_hash: str
    phone: str
    address: str
    district: str
    taluk: str
    udise_code: Optional[str] = None  # Unique District Information System for Education code
    principal_name: Optional[str] = None
    is_active: bool = True
    email_verified: bool = False

class AdminUser(BaseDocument):
    name: str
    email: EmailStr
    password_hash: str
    role: str = "admin"
    permissions: List[str] = Field(default_factory=list)
    is_active: bool = True

class EvaluatorUser(BaseDocument):
    name: str
    email: EmailStr
    password_hash: str
    role: str = "evaluator"
    expertise: str
    assigned_categories: List[str] = Field(default_factory=list)
    assigned_levels: List[CompetitionLevel] = Field(default_factory=list)
    created_by: str  # Admin ID who created this evaluator
    is_active: bool = True

# Drawing Competition Models
class Winner(BaseModel):
    name: str
    grade: str
    age: int
    theme: str
    position: int  # 1, 2, 3
    artwork_image_url: Optional[str] = None
    advances_to_next: bool = False
    student_id: Optional[str] = None

class DrawingParticipant(BaseDocument):
    school_id: str
    category: DrawingCategory
    level: CompetitionLevel
    participant_count: int = 0  # Initial registration - just numbers
    winners: List[Winner] = Field(default_factory=list)  # Added after competition
    submission_date: datetime = Field(default_factory=datetime.utcnow)
    is_completed: bool = False
    
    # Level progression tracking
    from_previous_level: bool = False
    advanced_from: Optional[CompetitionLevel] = None

# Teacher Award Models
class TeacherNomination(BaseDocument):
    school_id: str
    teacher_name: str
    category: TeacherAwardCategory
    award_type: str  # Specific award like "shikshan-ratna"
    
    # Teacher Details
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    experience_years: int
    current_position: str
    qualifications: str
    subjects_taught: List[str] = Field(default_factory=list)
    
    # Nomination Details
    achievements: str
    nomination_letter: str
    supporting_documents: List[str] = Field(default_factory=list)  # File URLs
    
    # Voting & Status
    public_votes: int = 0
    evaluator_scores: Dict[str, int] = Field(default_factory=dict)  # evaluator_id: score
    status: NominationStatus = NominationStatus.NOMINATED
    final_score: Optional[float] = None
    
    # Nomination fees
    nomination_fee_paid: bool = False
    payment_reference: Optional[str] = None

# Voting System Models
class VotingToken(BaseDocument):
    token: str = Field(default_factory=lambda: str(uuid.uuid4())[:8].upper())
    is_used: bool = False
    nomination_id: Optional[str] = None
    voted_at: Optional[datetime] = None
    ip_address: Optional[str] = None
    expires_at: datetime
    
class Vote(BaseDocument):
    token_id: str
    nomination_id: str
    ip_address: str
    user_agent: Optional[str] = None
    voted_at: datetime = Field(default_factory=datetime.utcnow)

# Request/Response Models
class SchoolRegistrationRequest(BaseModel):
    school_name: str
    authorized_person_name: str
    email: EmailStr
    password: str
    phone: str
    address: str
    district: str
    taluk: str
    udise_code: Optional[str] = None
    principal_name: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    user_type: UserRole
    school_name: Optional[str] = None
    expires_in: int = 86400  # 24 hours

class ParticipantRegistrationRequest(BaseModel):
    participants: Dict[DrawingCategory, int]  # category: count
    level: CompetitionLevel = CompetitionLevel.SCHOOL

class WinnerSubmissionRequest(BaseModel):
    category: DrawingCategory
    level: CompetitionLevel
    winners: List[Winner]

class TeacherNominationRequest(BaseModel):
    teacher_name: str
    category: TeacherAwardCategory
    award_type: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    experience_years: int
    current_position: str
    qualifications: str
    subjects_taught: List[str]
    achievements: str
    nomination_letter: str

class VoteRequest(BaseModel):
    token: str
    nomination_id: str

class TokenValidationRequest(BaseModel):
    token: str

# Dashboard Response Models
class SchoolDashboardStats(BaseModel):
    total_participants: int
    categories_registered: List[str]
    winners_submitted: int
    teacher_nominations: int
    current_level: str
    next_deadline: Optional[datetime] = None

class AdminDashboardStats(BaseModel):
    total_schools: int
    total_participants: int
    total_nominations: int
    active_evaluators: int
    votes_cast: int
    competitions_by_level: Dict[str, int]

class CompetitionSummary(BaseModel):
    category: str
    level: str
    total_participants: int
    schools_participated: int
    winners_declared: int

# File Upload Models
class FileUploadResponse(BaseModel):
    file_url: str
    file_name: str
    file_size: int
    upload_id: str