import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy, 
  Award, 
  Medal, 
  Star, 
  Users, 
  School,
  Vote,
  Crown,
  Target
} from 'lucide-react';

const Results = () => {
  const [activeLevel, setActiveLevel] = useState('state');

  // Mock drawing competition results
  const drawingResults = {
    state: [
      {
        category: 'pre-school',
        categoryName: 'Pre-school (Ages 3-5)',
        theme: 'My Dream World',
        winners: [
          { position: 1, name: 'Aadhya Sharma', school: 'Vidya Mandir', district: 'Bangalore Urban', grade: 'UKG', age: 5 },
          { position: 2, name: 'Arjun Patel', school: 'Little Angels', district: 'Mysore', grade: 'LKG', age: 4 },
          { position: 3, name: 'Kavya Reddy', school: 'Bright Stars', district: 'Dharwad', grade: 'UKG', age: 5 }
        ]
      },
      {
        category: 'junior-artists',
        categoryName: 'Junior Artists (Grades 1-4)',
        theme: 'Nature & Me: Karnataka\'s Green Beauty',
        winners: [
          { position: 1, name: 'Ravi Kumar', school: 'Green Valley School', district: 'Hubli', grade: '3rd', age: 8 },
          { position: 2, name: 'Priya Nair', school: 'St. Mary\'s', district: 'Mangalore', grade: '4th', age: 9 },
          { position: 3, name: 'Arun Gowda', school: 'Kendriya Vidyalaya', district: 'Belgaum', grade: '2nd', age: 7 }
        ]
      },
      {
        category: 'young-creators',
        categoryName: 'Young Creators (Grades 5-7)',
        theme: 'Future Karnataka: Smart Cities & Sustainable Living',
        winners: [
          { position: 1, name: 'Sneha Rao', school: 'Delhi Public School', district: 'Bangalore Urban', grade: '6th', age: 11 },
          { position: 2, name: 'Karthik Shetty', school: 'National Public School', district: 'Udupi', grade: '7th', age: 12 },
          { position: 3, name: 'Meera Joshi', school: 'Ryan International', district: 'Pune', grade: '5th', age: 10 }
        ]
      }
    ],
    district: [
      {
        category: 'aspiring-innovators',
        categoryName: 'Aspiring Innovators (Grades 8-10)',
        theme: 'Cultural Tapestry of Karnataka: Unity in Diversity',
        winners: [
          { position: 1, name: 'Rohit Desai', school: 'Christ School', district: 'Bangalore Urban', grade: '9th', age: 14 },
          { position: 2, name: 'Ananya Singh', school: 'Bishop Cotton', district: 'Bangalore Urban', grade: '10th', age: 15 }
        ]
      }
    ]
  };

  // Mock teacher award results
  const teacherResults = [
    {
      id: 'nom-001',
      teacher_name: 'Dr. Sunita Rao',
      school_name: 'Karnataka Public School',
      district: 'Bangalore Urban',
      category: 'Academic Excellence',
      award_type: 'Shikshan Samrat',
      experience_years: 15,
      public_votes: 1247,
      status: 'winner',
      achievements: 'Best Teacher Award 2022, 98% pass rate in board exams for 5 consecutive years'
    },
    {
      id: 'nom-002',
      teacher_name: 'Prof. Meera Desai',
      school_name: 'Vidya Vikas High School',
      district: 'Mysore',
      category: 'Innovation & Growth',
      award_type: 'Shikshan Chaitanya',
      experience_years: 18,
      public_votes: 1156,
      status: 'winner',
      achievements: 'Introduced AR/VR in science teaching, 15 research publications'
    },
    {
      id: 'nom-003',
      teacher_name: 'Mr. Prakash Gowda',
      school_name: 'St. Mary\'s Convent',
      district: 'Dharwad',
      category: 'Inspirational Teaching',
      award_type: 'Shikshan Jyoti',
      experience_years: 12,
      public_votes: 892,
      status: 'shortlisted',
      achievements: 'Started school drama club, Published poetry book, Student mentor for 8 years'
    },
    {
      id: 'nom-004',
      teacher_name: 'Mrs. Lakshmi Iyer',
      school_name: 'Kendriya Vidyalaya',
      district: 'Belgaum',
      category: 'Social Contribution',
      award_type: 'Shikshan Sevak',
      experience_years: 20,
      public_votes: 756,
      status: 'shortlisted',
      achievements: 'Community education programs, Rural school development initiatives'
    }
  ];

  const getPositionIcon = (position) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <Star className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPositionColor = (position) => {
    switch (position) {
      case 1: return 'from-yellow-400 to-amber-500';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-amber-600 to-orange-700';
      default: return 'from-blue-400 to-indigo-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'winner': return 'bg-green-100 text-green-800 border-green-200';
      case 'shortlisted': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'nominated': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Competition Results</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Celebrating the winners and outstanding participants of Ignite & Inspire Karnataka 2025-26
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="drawing" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="drawing" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Drawing Competition
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Teacher Awards
            </TabsTrigger>
          </TabsList>

          {/* Drawing Competition Results */}
          <TabsContent value="drawing" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Canvas of Creativity Winners</h2>
              <p className="text-lg text-slate-600">State and District level competition results</p>
            </div>

            {/* Level Selector */}
            <div className="flex justify-center gap-4 mb-8">
              <Button
                onClick={() => setActiveLevel('state')}
                variant={activeLevel === 'state' ? 'default' : 'outline'}
                className={activeLevel === 'state' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : ''}
              >
                <Crown className="w-4 h-4 mr-2" />
                State Level Winners
              </Button>
              <Button
                onClick={() => setActiveLevel('district')}
                variant={activeLevel === 'district' ? 'default' : 'outline'}
                className={activeLevel === 'district' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : ''}
              >
                <Target className="w-4 h-4 mr-2" />
                District Level Winners
              </Button>
            </div>

            {/* Winners Display */}
            <div className="space-y-8">
              {drawingResults[activeLevel]?.map((categoryResult, index) => (
                <Card key={index} className="overflow-hidden shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-slate-100 to-gray-100">
                    <CardTitle className="text-2xl text-center">
                      {categoryResult.categoryName}
                    </CardTitle>
                    <p className="text-center text-slate-600 font-medium">
                      Theme: {categoryResult.theme}
                    </p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {categoryResult.winners.map((winner, winnerIndex) => (
                        <Card key={winnerIndex} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                          <CardContent className="p-6 text-center">
                            <div className={`w-16 h-16 bg-gradient-to-r ${getPositionColor(winner.position)} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                              {getPositionIcon(winner.position)}
                            </div>
                            <Badge className="mb-3 bg-slate-100 text-slate-700">
                              {winner.position === 1 ? '1st Place' : winner.position === 2 ? '2nd Place' : '3rd Place'}
                            </Badge>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{winner.name}</h3>
                            <div className="space-y-1 text-sm text-slate-600">
                              <p className="flex items-center justify-center gap-1">
                                <School className="w-4 h-4" />
                                {winner.school}
                              </p>
                              <p>{winner.district}</p>
                              <p>{winner.grade} • Age {winner.age}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Teacher Awards Results */}
          <TabsContent value="teachers" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Pillars of Excellence Awards</h2>
              <p className="text-lg text-slate-600">Recognizing outstanding educators across Karnataka</p>
            </div>

            {/* Winners Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-8 text-green-700">🏆 Award Winners</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {teacherResults.filter(teacher => teacher.status === 'winner').map((teacher, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Crown className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-slate-900">{teacher.teacher_name}</h3>
                            <Badge className={getStatusColor(teacher.status)}>
                              Winner
                            </Badge>
                          </div>
                          <p className="text-slate-600 mb-2 flex items-center gap-1">
                            <School className="w-4 h-4" />
                            {teacher.school_name} • {teacher.district}
                          </p>
                          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                            <div>
                              <span className="font-medium">Category:</span>
                              <p>{teacher.category}</p>
                            </div>
                            <div>
                              <span className="font-medium">Award:</span>
                              <p>{teacher.award_type}</p>
                            </div>
                            <div>
                              <span className="font-medium">Experience:</span>
                              <p>{teacher.experience_years} years</p>
                            </div>
                            <div>
                              <span className="font-medium">Public Votes:</span>
                              <p className="flex items-center gap-1">
                                <Vote className="w-3 h-3 text-blue-500" />
                                {teacher.public_votes.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-700 bg-white p-3 rounded-lg">
                            <strong>Key Achievements:</strong> {teacher.achievements}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Shortlisted Section */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8 text-amber-700">⭐ Shortlisted Nominees</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {teacherResults.filter(teacher => teacher.status === 'shortlisted').map((teacher, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-amber-200 bg-amber-50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-slate-900">{teacher.teacher_name}</h3>
                            <Badge className={getStatusColor(teacher.status)}>
                              Shortlisted
                            </Badge>
                          </div>
                          <p className="text-slate-600 mb-2 flex items-center gap-1">
                            <School className="w-4 h-4" />
                            {teacher.school_name} • {teacher.district}
                          </p>
                          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                            <div>
                              <span className="font-medium">Category:</span>
                              <p>{teacher.category}</p>
                            </div>
                            <div>
                              <span className="font-medium">Award:</span>
                              <p>{teacher.award_type}</p>
                            </div>
                            <div>
                              <span className="font-medium">Experience:</span>
                              <p>{teacher.experience_years} years</p>
                            </div>
                            <div>
                              <span className="font-medium">Public Votes:</span>
                              <p className="flex items-center gap-1">
                                <Vote className="w-3 h-3 text-blue-500" />
                                {teacher.public_votes.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-700 bg-white p-3 rounded-lg">
                            <strong>Key Achievements:</strong> {teacher.achievements}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-6">Award Statistics</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-3xl font-bold mb-2">
                      {teacherResults.length}
                    </div>
                    <div className="text-indigo-100">Total Nominations</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">
                      {teacherResults.filter(t => t.status === 'winner').length}
                    </div>
                    <div className="text-indigo-100">Winners</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">
                      {teacherResults.filter(t => t.status === 'shortlisted').length}
                    </div>
                    <div className="text-indigo-100">Shortlisted</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">
                      {teacherResults.reduce((sum, t) => sum + t.public_votes, 0).toLocaleString()}
                    </div>
                    <div className="text-indigo-100">Total Votes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Results;