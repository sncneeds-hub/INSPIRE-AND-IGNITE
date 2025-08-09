import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Users, Plus, Save, Info } from 'lucide-react';
import { drawingCategories, competitionLevels } from '../../data/mockData';

const ParticipantRegistration = ({ onSubmit }) => {
  const [selectedLevel, setSelectedLevel] = useState('school');
  const [participants, setParticipants] = useState({
    'pre-school': 0,
    'junior-artists': 0,
    'young-creators': 0,
    'aspiring-innovators': 0,
    'master-visionaries': 0
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleParticipantChange = (category, value) => {
    const numValue = parseInt(value) || 0;
    setParticipants(prev => ({
      ...prev,
      [category]: numValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registrationData = {
        level: selectedLevel,
        participants: participants,
        total: Object.values(participants).reduce((sum, count) => sum + count, 0)
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(registrationData);
      setSuccess(true);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalParticipants = Object.values(participants).reduce((sum, count) => sum + count, 0);
  const entryFee = totalParticipants * 20; // ₹20 per participant

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Register Participants
          </CardTitle>
          <p className="text-gray-600">
            Enter the number of participants for each category. Entry fee: ₹20 per participant.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Participants registered successfully!
                </AlertDescription>
              </Alert>
            )}

            {/* Competition Level Selection */}
            <div className="space-y-2">
              <Label>Competition Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select competition level" />
                </SelectTrigger>
                <SelectContent>
                  {competitionLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Participant Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Participant Numbers by Category</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {drawingCategories.map(category => (
                  <Card key={category.value} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{category.label}</h4>
                          <p className="text-sm text-gray-600">{category.ages}</p>
                        </div>
                        <Badge variant="outline">{category.ages}</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={category.value}>Number of Participants</Label>
                        <Input
                          id={category.value}
                          type="number"
                          min="0"
                          max="100"
                          value={participants[category.value]}
                          onChange={(e) => handleParticipantChange(category.value, e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Summary */}
            {totalParticipants > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Registration Summary</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Participants:</span>
                      <span className="font-semibold">{totalParticipants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entry Fee (₹20 per participant):</span>
                      <span className="font-semibold">₹{entryFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Competition Level:</span>
                      <span className="font-semibold capitalize">{selectedLevel}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={loading || totalParticipants === 0}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Registering...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Register Participants
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantRegistration;