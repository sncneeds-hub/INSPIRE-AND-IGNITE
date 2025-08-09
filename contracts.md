# API Contracts & Integration Plan

## User Roles & Authentication

### 1. School Users
- **Registration**: School authorized person creates account
- **Login**: Email/password authentication
- **Permissions**: Manage participants, add winner details, nominate teachers

### 2. Admin Users  
- **Creation**: Only admin can create evaluator accounts
- **Login**: Email/password authentication
- **Permissions**: Full system access, manage evaluators, view all data

### 3. Public Voting
- **No accounts required**
- **Token-based voting** for teacher awards
- **One vote per token**

## API Endpoints Structure

### Authentication APIs
```
POST /api/auth/school/register
POST /api/auth/school/login
POST /api/auth/admin/login
POST /api/auth/logout
GET /api/auth/profile
```

### School Management APIs
```
GET /api/schools/profile
PUT /api/schools/profile
GET /api/schools/participants
POST /api/schools/participants/register
PUT /api/schools/participants/winners
GET /api/schools/teacher-nominations
POST /api/schools/teacher-nominations
```

### Drawing Competition APIs
```
GET /api/competition/categories
POST /api/competition/register-participants
GET /api/competition/participants/:schoolId
POST /api/competition/winners/:level
GET /api/competition/winners/:level/:category
```

### Teacher Awards APIs
```
POST /api/teacher-awards/nominate
GET /api/teacher-awards/nominations
PUT /api/teacher-awards/nominations/:id
GET /api/teacher-awards/categories
```

### Voting APIs
```
POST /api/voting/validate-token
POST /api/voting/cast-vote
GET /api/voting/results/:nominationId
```

### Admin APIs
```
POST /api/admin/evaluators
GET /api/admin/evaluators
PUT /api/admin/evaluators/:id
DELETE /api/admin/evaluators/:id
GET /api/admin/dashboard-stats
GET /api/admin/all-participants
GET /api/admin/all-nominations
```

## Database Models

### School Model
```javascript
{
  _id: ObjectId,
  schoolName: String,
  authorizedPersonName: String,
  email: String,
  password: String (hashed),
  phone: String,
  address: String,
  district: String,
  taluk: String,
  registrationDate: Date,
  isActive: Boolean
}
```

### DrawingParticipant Model
```javascript
{
  _id: ObjectId,
  schoolId: ObjectId,
  category: String, // pre-school, junior-artists, etc.
  level: String, // school, taluk, district, state
  participantCount: Number, // For initial registration
  winners: [{
    name: String,
    grade: String,
    age: Number,
    theme: String,
    position: Number, // 1, 2, 3
    artworkImage: String, // File path
    advancesToNext: Boolean
  }],
  submissionDate: Date
}
```

### TeacherNomination Model
```javascript
{
  _id: ObjectId,
  schoolId: ObjectId,
  teacherName: String,
  category: String, // lifetime-excellence, inspirational, etc.
  awardType: String, // shikshan-ratna, guru-vandana, etc.
  experience: Number,
  qualifications: String,
  achievements: String,
  nominationLetter: String,
  supportingDocuments: [String],
  publicVotes: Number,
  status: String, // nominated, shortlisted, winner
  submissionDate: Date
}
```

### VotingToken Model
```javascript
{
  _id: ObjectId,
  token: String, // Unique voting token
  isUsed: Boolean,
  nominationId: ObjectId,
  votedAt: Date,
  ipAddress: String
}
```

### EvaluatorUser Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: String, // drawing-judge, teacher-evaluator
  expertise: String,
  assignedCategories: [String],
  createdBy: ObjectId, // Admin who created
  isActive: Boolean
}
```

## Frontend Integration Plan

### 1. School Dashboard Components
- **Registration Form** → POST /api/auth/school/register
- **Login Form** → POST /api/auth/school/login  
- **Participant Registration** → POST /api/competition/register-participants
- **Winner Submission** → PUT /api/schools/participants/winners
- **Teacher Nomination** → POST /api/teacher-awards/nominate

### 2. Admin Dashboard Components
- **Evaluator Management** → CRUD operations on /api/admin/evaluators
- **Statistics View** → GET /api/admin/dashboard-stats
- **Participant Overview** → GET /api/admin/all-participants
- **Nomination Review** → GET /api/admin/all-nominations

### 3. Public Voting Components
- **Token Input** → POST /api/voting/validate-token
- **Vote Submission** → POST /api/voting/cast-vote
- **Results Display** → GET /api/voting/results

### 4. Navigation & Routing
```
/school/register → School registration
/school/login → School login
/school/dashboard → School management panel
/admin/login → Admin login
/admin/dashboard → Admin control panel
/vote → Public voting interface
/results → Public results view
```

## Data Flow Summary

1. **School Registration Phase**: Schools register → Add participant numbers per category
2. **Competition Phase**: After each level → Schools add winner details 
3. **Teacher Nomination Phase**: Schools nominate teachers → Public votes with tokens
4. **Evaluation Phase**: Admin-created evaluators review and judge
5. **Results Phase**: Public can view results and winners

## Mock Data Strategy

Initially create mock data for:
- Sample school registrations
- Dummy participant numbers
- Sample teacher nominations
- Generated voting tokens
- Mock evaluation results

This allows frontend development and testing before full backend integration.