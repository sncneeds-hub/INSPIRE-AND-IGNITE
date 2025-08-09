import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Award, School, Search, Eye, Vote, User } from 'lucide-react';

const NominationsOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock data - replace with actual API call
  const nominations = [
    {
      id: 'nom-001',
      teacher_name: 'Mrs. Sunita Rao',
      school_name: 'Karnataka Public School',
      district: 'Bangalore Urban',
      category: 'academic-excellence',
      award_type: 'shikshan-samrat',
      experience_years: 15,
      public_votes: 127,
      status: 'nominated',
      submission_date: '2025-08-20'
    },
    {
      id: 'nom-002',
      teacher_name: 'Dr. Meera Desai',
      school_name: 'Vidya Vikas High School',
      district: 'Mysore',
      category: 'innovation-growth',
      award_type: 'shikshan-chaitanya',
      experience_years: 18,
      public_votes: 203,
      status: 'shortlisted',
      submission_date: '2025-08-22'
    },
    {
      id: 'nom-003',
      teacher_name: 'Mr. Prakash Gowda',
      school_name: 'St. Mary\'s Convent',
      district: 'Dharwad',
      category: 'inspirational-teaching',
      award_type: 'shikshan-jyoti',
      experience_years: 12,
      public_votes: 89,
      status: 'nominated',
      submission_date: '2025-08-25'
    }
  ];

  const filteredNominations = nominations.filter(nomination => {
    const matchesSearch = nomination.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nomination.school_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || nomination.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || nomination.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalStats = {
    total_nominations: nominations.length,
    total_votes: nominations.reduce((sum, n) => sum + n.public_votes, 0),
    shortlisted: nominations.filter(n => n.status === 'shortlisted').length,
    winners: nominations.filter(n => n.status === 'winner').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'nominated': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-amber-100 text-amber-800';
      case 'winner': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Teacher Nominations</h2>
        <p className="text-gray-600">Monitor and manage all teacher award nominations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Nominations</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.total_nominations}</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Votes</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.total_votes}</p>
              </div>
              <Vote className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shortlisted</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.shortlisted}</p>
              </div>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Winners</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.winners}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by teacher name or school..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="nominated">Nominated</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="winner">Winner</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="lifetime-excellence">Lifetime Excellence</SelectItem>
                <SelectItem value="inspirational-teaching">Inspirational Teaching</SelectItem>
                <SelectItem value="academic-excellence">Academic Excellence</SelectItem>
                <SelectItem value="innovation-growth">Innovation & Growth</SelectItem>
                <SelectItem value="social-contribution">Social Contribution</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Nominations List */}
      <div className="grid gap-4">
        {filteredNominations.map(nomination => (
          <Card key={nomination.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{nomination.teacher_name}</h3>
                      <p className="text-gray-600 flex items-center gap-1">
                        <School className="w-4 h-4" />
                        {nomination.school_name} • {nomination.district}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold capitalize">{nomination.category.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Award Type</p>
                      <p className="font-semibold capitalize">{nomination.award_type.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-semibold">{nomination.experience_years} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Public Votes</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Vote className="w-4 h-4 text-blue-500" />
                        {nomination.public_votes}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusColor(nomination.status)}>
                    {nomination.status.charAt(0).toUpperCase() + nomination.status.slice(1)}
                  </Badge>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    
                    <Select>
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nominated">Nominated</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="winner">Winner</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNominations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No Nominations Found</h3>
            <p className="text-gray-600">No nominations match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NominationsOverview;