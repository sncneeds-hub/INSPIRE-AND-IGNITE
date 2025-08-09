import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Users, School, Search, Filter } from 'lucide-react';

const ParticipantsOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock data - replace with actual API call
  const participants = [
    {
      id: 'part-001',
      school_name: 'Karnataka Public School',
      district: 'Bangalore Urban',
      taluk: 'Bangalore North',
      category: 'pre-school',
      level: 'school',
      participant_count: 12,
      winners_count: 2,
      is_completed: true
    },
    {
      id: 'part-002',
      school_name: 'Vidya Vikas High School',
      district: 'Mysore',
      taluk: 'Mysore',
      category: 'junior-artists',
      level: 'taluk',
      participant_count: 25,
      winners_count: 3,
      is_completed: true
    },
    {
      id: 'part-003',
      school_name: 'St. Mary\'s Convent',
      district: 'Dharwad',
      taluk: 'Dharwad',
      category: 'young-creators',
      level: 'district',
      participant_count: 8,
      winners_count: 0,
      is_completed: false
    }
  ];

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || participant.level === filterLevel;
    const matchesCategory = filterCategory === 'all' || participant.category === filterCategory;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const totalStats = {
    total_participants: participants.reduce((sum, p) => sum + p.participant_count, 0),
    total_schools: new Set(participants.map(p => p.school_name)).size,
    completed_competitions: participants.filter(p => p.is_completed).length,
    total_winners: participants.reduce((sum, p) => sum + p.winners_count, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Participants Overview</h2>
        <p className="text-gray-600">Monitor all participant registrations across Karnataka</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.total_participants}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participating Schools</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.total_schools}</p>
              </div>
              <School className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.completed_competitions}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Winners</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.total_winners}</p>
              </div>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
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
                  placeholder="Search by school name or district..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="school">School Level</SelectItem>
                <SelectItem value="taluk">Taluk Level</SelectItem>
                <SelectItem value="district">District Level</SelectItem>
                <SelectItem value="state">State Level</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="pre-school">Pre-school</SelectItem>
                <SelectItem value="junior-artists">Junior Artists</SelectItem>
                <SelectItem value="young-creators">Young Creators</SelectItem>
                <SelectItem value="aspiring-innovators">Aspiring Innovators</SelectItem>
                <SelectItem value="master-visionaries">Master Visionaries</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      <div className="grid gap-4">
        {filteredParticipants.map(participant => (
          <Card key={participant.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <School className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{participant.school_name}</h3>
                      <p className="text-gray-600">{participant.district} • {participant.taluk}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold capitalize">{participant.category.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Level</p>
                      <p className="font-semibold capitalize">{participant.level}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Participants</p>
                      <p className="font-semibold">{participant.participant_count}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Winners</p>
                      <p className="font-semibold">{participant.winners_count}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge variant={participant.is_completed ? 'default' : 'secondary'}>
                    {participant.is_completed ? 'Completed' : 'In Progress'}
                  </Badge>
                  {participant.winners_count > 0 && (
                    <Badge variant="outline" className="text-amber-600 border-amber-200">
                      {participant.winners_count} Winners
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredParticipants.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No Participants Found</h3>
            <p className="text-gray-600">No participants match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ParticipantsOverview;