// Mock data for development and testing

export const mockSchoolUser = {
  id: "school-001",
  school_name: "Karnataka Public School",
  authorized_person_name: "Dr. Rajesh Kumar",
  email: "principal@kpschool.edu.in",
  phone: "9876543210",
  address: "MG Road, Bangalore",
  district: "Bangalore Urban",
  taluk: "Bangalore North",
  udise_code: "29010100101",
  principal_name: "Dr. Rajesh Kumar",
  is_active: true
};

export const mockDashboardStats = {
  total_participants: 45,
  categories_registered: ["pre-school", "junior-artists", "young-creators"],
  winners_submitted: 2,
  teacher_nominations: 3,
  current_level: "taluk",
  next_deadline: "2025-10-15T23:59:59Z"
};

export const mockParticipants = [
  {
    id: "part-001",
    school_id: "school-001",
    category: "pre-school",
    level: "school",
    participant_count: 12,
    winners: [
      {
        name: "Aarav Sharma",
        grade: "LKG",
        age: 4,
        theme: "My Dream World",
        position: 1,
        advances_to_next: true
      },
      {
        name: "Priya Patil",
        grade: "UKG", 
        age: 5,
        theme: "My Dream World",
        position: 2,
        advances_to_next: true
      }
    ],
    is_completed: true,
    submission_date: "2025-09-15T10:30:00Z"
  },
  {
    id: "part-002",
    school_id: "school-001",
    category: "junior-artists",
    level: "school",
    participant_count: 18,
    winners: [],
    is_completed: false,
    submission_date: "2025-09-10T14:20:00Z"
  },
  {
    id: "part-003",
    school_id: "school-001",
    category: "young-creators",
    level: "school", 
    participant_count: 15,
    winners: [
      {
        name: "Kavya Reddy",
        grade: "6th",
        age: 11,
        theme: "Nature & Me: Karnataka's Green Beauty",
        position: 1,
        advances_to_next: true
      }
    ],
    is_completed: true,
    submission_date: "2025-09-12T16:45:00Z"
  }
];

export const mockTeacherNominations = [
  {
    id: "nom-001",
    school_id: "school-001",
    teacher_name: "Mrs. Sunita Rao",
    category: "academic-excellence",
    award_type: "shikshan-samrat",
    email: "sunita.rao@kpschool.edu.in",
    phone: "9876543211",
    experience_years: 15,
    current_position: "Senior Mathematics Teacher",
    qualifications: "M.Sc Mathematics, B.Ed",
    subjects_taught: ["Mathematics", "Statistics"],
    achievements: "Best Teacher Award 2022, 98% pass rate in board exams for 5 consecutive years",
    nomination_letter: "Mrs. Sunita Rao has been an exemplary teacher...",
    public_votes: 127,
    status: "nominated",
    submission_date: "2025-08-20T09:15:00Z"
  },
  {
    id: "nom-002",
    school_id: "school-001", 
    teacher_name: "Mr. Prakash Gowda",
    category: "inspirational-teaching",
    award_type: "shikshan-jyoti",
    email: "prakash.gowda@kpschool.edu.in",
    phone: "9876543212",
    experience_years: 12,
    current_position: "English Literature Teacher",
    qualifications: "M.A English Literature, B.Ed, CELTA",
    subjects_taught: ["English Literature", "Creative Writing"],
    achievements: "Started school drama club, Published poetry book, Student mentor for 8 years",
    nomination_letter: "Mr. Prakash Gowda is an inspiration to both students and fellow teachers...",
    public_votes: 89,
    status: "nominated",
    submission_date: "2025-08-22T11:30:00Z"
  }
];

export const mockVotingNominations = [
  {
    nomination_id: "nom-001",
    teacher_name: "Mrs. Sunita Rao",
    category: "academic-excellence",
    award_type: "shikshan-samrat", 
    school_name: "Karnataka Public School",
    district: "Bangalore Urban",
    experience_years: 15,
    current_position: "Senior Mathematics Teacher",
    achievements: "Best Teacher Award 2022, 98% pass rate in board exams for 5 consecutive years...",
    public_votes: 127,
    status: "nominated"
  },
  {
    nomination_id: "nom-002",
    teacher_name: "Mr. Prakash Gowda",
    category: "inspirational-teaching",
    award_type: "shikshan-jyoti",
    school_name: "Karnataka Public School", 
    district: "Bangalore Urban",
    experience_years: 12,
    current_position: "English Literature Teacher",
    achievements: "Started school drama club, Published poetry book, Student mentor for 8 years...",
    public_votes: 89,
    status: "nominated"
  },
  {
    nomination_id: "nom-003",
    teacher_name: "Dr. Meera Desai",
    category: "innovation-growth",
    award_type: "shikshan-chaitanya",
    school_name: "Vidya Vikas High School",
    district: "Mysore",
    experience_years: 18,
    current_position: "Science Department Head",
    achievements: "Introduced AR/VR in science teaching, 15 research publications, Science fair coordinator...",
    public_votes: 203,
    status: "shortlisted"
  }
];

export const mockAdminStats = {
  total_schools: 1247,
  total_participants: 15632,
  total_nominations: 456,
  active_evaluators: 24,
  votes_cast: 8934,
  competitions_by_level: {
    school: 1247,
    taluk: 342,
    district: 89,
    state: 15
  }
};

export const mockVotingTokens = [
  "AB123CD4",
  "EF567GH8", 
  "IJ901KL2",
  "MN345OP6",
  "QR789ST0"
];

// Categories and levels
export const drawingCategories = [
  { value: "pre-school", label: "Pre-school", ages: "Ages 3-5" },
  { value: "junior-artists", label: "Junior Artists", ages: "Grades 1-4" },
  { value: "young-creators", label: "Young Creators", ages: "Grades 5-7" },
  { value: "aspiring-innovators", label: "Aspiring Innovators", ages: "Grades 8-10" },
  { value: "master-visionaries", label: "Master Visionaries", ages: "PUC I & II" }
];

export const competitionLevels = [
  { value: "school", label: "School Level" },
  { value: "taluk", label: "Taluk Level" },
  { value: "district", label: "District Level" },
  { value: "state", label: "State Level" }
];

export const teacherAwardCategories = [
  { value: "lifetime-excellence", label: "Lifetime Excellence Awards" },
  { value: "inspirational-teaching", label: "Inspirational Teaching Awards" },
  { value: "academic-excellence", label: "Academic Excellence Awards" },
  { value: "innovation-growth", label: "Innovation & Growth Awards" },
  { value: "social-contribution", label: "Social Contribution & Service Awards" }
];

export const awardTypes = {
  "lifetime-excellence": [
    { value: "shikshan-ratna", label: "Shikshan Ratna" },
    { value: "guru-vandana-puraskar", label: "Guru Vandana Puraskar" },
    { value: "shikshan-sadhak", label: "Shikshan Sadhak" }
  ],
  "inspirational-teaching": [
    { value: "shikshan-jyoti", label: "Shikshan Jyoti" },
    { value: "shikshan-prerana", label: "Shikshan Prerana" },
    { value: "shikshan-bandhu", label: "Shikshan Bandhu" }
  ],
  "academic-excellence": [
    { value: "shikshan-samrat", label: "Shikshan Samrat" },
    { value: "shikshan-parangat", label: "Shikshan Parangat" },
    { value: "adarsha-shikshaka", label: "Adarsha Shikshaka" }
  ],
  "innovation-growth": [
    { value: "shikshan-abhivardhan", label: "Shikshan Abhivardhan" },
    { value: "shikshan-chaitanya", label: "Shikshan Chaitanya" },
    { value: "shikshan-vibhuti", label: "Shikshan Vibhuti" }
  ],
  "social-contribution": [
    { value: "shikshan-bhaskar", label: "Shikshan Bhaskar" },
    { value: "shikshan-deepa", label: "Shikshan Deepa" },
    { value: "shikshan-sevak", label: "Shikshan Sevak" }
  ]
};

// Karnataka districts and taluks (sample data)
export const karnatakaDistricts = [
  "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban",
  "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga",
  "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Hassan",
  "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal",
  "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga",
  "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
];

export const taluksByDistrict = {
  "Bengaluru Urban": ["Anekal", "Bangalore North", "Bangalore South", "Bangalore East"],
  "Mysuru": ["Mysuru", "Hunsur", "Krishnarajanagara", "Nanjangud", "Periyapatna", "Piriyapatna", "T. Narasipura"],
  "Dharwad": ["Dharwad", "Hubli", "Kalghatgi", "Kundgol", "Navalgund"]
  // Add more taluks as needed
};