import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, 
  Trophy, 
  Award, 
  Plus, 
  Eye, 
  Calendar,
  School,
  LogOut,
  BarChart3
} from 'lucide-react';
import ParticipantRegistration from './ParticipantRegistration';
import WinnerSubmission from './WinnerSubmission';
import TeacherNomination from './TeacherNomination';
import { mockDashboardStats, mockParticipants, mockTeacherNominations } from '../../data/mockData';

const SchoolDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardStats, setDashboardStats] = useState(mockDashboardStats);
  const [participants, setParticipants] = useState(mockParticipants);
  const [nominations, setNominations] = useState(mockTeacherNominations);

  const statCards = [
    {
      title: 'Total Participants',
      value: dashboardStats.total_participants,
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Categories Registered',
      value: dashboardStats.categories_registered.length,
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Winners Submitted',
      value: dashboardStats.winners_submitted,
      icon: Trophy,
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Teacher Nominations',
      value: dashboardStats.teacher_nominations,
      icon: Award,
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const handleParticipantRegistration = (registrationData) => {
    // Update participants list
    console.log('Participant registration:', registrationData);
    // In real app, this would make API call
  };

  const handleWinnerSubmission = (winnerData) => {
    // Update winners
    console.log('Winner submission:', winnerData);
    // In real app, this would make API call
  };

  const handleTeacherNomination = (nominationData) => {
    // Add new nomination
    console.log('Teacher nomination:', nominationData);
    // In real app, this would make API call
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.schoolName}</h1>
                <p className="text-gray-600">School Dashboard</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="register">Register Participants</TabsTrigger>
            <TabsTrigger value="winners">Submit Winners</TabsTrigger>
            <TabsTrigger value="teachers">Nominate Teachers</TabsTrigger>
            <TabsTrigger value="history">View History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              {statCards.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Current Level Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Current Competition Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-amber-800">Current Level: {dashboardStats.current_level}</h3>
                    <p className="text-amber-700">Continue registering participants and submitting winners</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800">Active</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('register')}>
                <CardContent className="p-6 text-center">
                  <Plus className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="font-semibold mb-2">Register Participants</h3>
                  <p className="text-sm text-gray-600">Add participant numbers by category</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('winners')}>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-amber-500" />
                  <h3 className="font-semibold mb-2">Submit Winners</h3>
                  <p className="text-sm text-gray-600">Add winner details for next level</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('teachers')}>
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="font-semibold mb-2">Nominate Teachers</h3>
                  <p className="text-sm text-gray-600">Submit teacher award nominations</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="register">
            <ParticipantRegistration onSubmit={handleParticipantRegistration} />
          </TabsContent>

          <TabsContent value="winners">
            <WinnerSubmission 
              participants={participants}
              onSubmit={handleWinnerSubmission} 
            />
          </TabsContent>

          <TabsContent value="teachers">
            <TeacherNomination onSubmit={handleTeacherNomination} />
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-6">
              {/* Participants History */}
              <Card>
                <CardHeader>
                  <CardTitle>Participant Registration History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {participants.map((participant, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold capitalize">{participant.category.replace('-', ' ')}</h4>
                          <p className="text-sm text-gray-600">
                            {participant.participant_count} participants • {participant.level} level
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={participant.is_completed ? 'default' : 'secondary'}>
                            {participant.is_completed ? 'Completed' : 'Pending'}
                          </Badge>
                          {participant.winners.length > 0 && (
                            <Badge variant="outline">{participant.winners.length} Winners</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Teacher Nominations History */}
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Nominations History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nominations.map((nomination, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{nomination.teacher_name}</h4>
                          <p className="text-sm text-gray-600">
                            {nomination.award_type} • {nomination.experience_years} years experience
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{nomination.public_votes} votes</Badge>
                          <Badge variant={nomination.status === 'nominated' ? 'default' : 'secondary'}>
                            {nomination.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SchoolDashboard;