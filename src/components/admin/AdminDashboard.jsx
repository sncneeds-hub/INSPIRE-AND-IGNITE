import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, 
  School, 
  Award, 
  Vote,
  Shield,
  LogOut,
  BarChart3,
  UserPlus,
  Eye
} from 'lucide-react';
import EvaluatorManagement from './EvaluatorManagement';
import ParticipantsOverview from './ParticipantsOverview';
import NominationsOverview from './NominationsOverview';
import VotingTokens from './VotingTokens';
import { mockAdminStats } from '../../data/mockData';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [adminStats, setAdminStats] = useState(mockAdminStats);

  const statCards = [
    {
      title: 'Total Schools',
      value: adminStats.total_schools,
      icon: School,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Participants',
      value: adminStats.total_participants,
      icon: Users,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Teacher Nominations',
      value: adminStats.total_nominations,
      icon: Award,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Votes Cast',
      value: adminStats.votes_cast,
      icon: Vote,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Ignite & Inspire Karnataka</p>
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="evaluators">Evaluators</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="nominations">Nominations</TabsTrigger>
            <TabsTrigger value="voting">Voting Tokens</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
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
                          <p className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
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

            {/* Competition Levels Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Competition Progress by Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {Object.entries(adminStats.competitions_by_level).map(([level, count]) => (
                    <div key={level} className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">{count}</p>
                      <p className="text-sm text-gray-600 capitalize">{level} Level</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('evaluators')}>
                <CardContent className="p-6 text-center">
                  <UserPlus className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
                  <h3 className="font-semibold mb-2">Manage Evaluators</h3>
                  <p className="text-sm text-gray-600">Create and manage evaluator accounts</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('participants')}>
                <CardContent className="p-6 text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-emerald-500" />
                  <h3 className="font-semibold mb-2">View Participants</h3>
                  <p className="text-sm text-gray-600">Monitor all participant registrations</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('voting')}>
                <CardContent className="p-6 text-center">
                  <Vote className="w-12 h-12 mx-auto mb-4 text-amber-500" />
                  <h3 className="font-semibold mb-2">Generate Tokens</h3>
                  <p className="text-sm text-gray-600">Create voting tokens for public voting</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="evaluators">
            <EvaluatorManagement />
          </TabsContent>

          <TabsContent value="participants">
            <ParticipantsOverview />
          </TabsContent>

          <TabsContent value="nominations">
            <NominationsOverview />
          </TabsContent>

          <TabsContent value="voting">
            <VotingTokens />
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Reports Coming Soon</h3>
                  <p className="text-gray-600">Detailed analytics and reports will be available here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;