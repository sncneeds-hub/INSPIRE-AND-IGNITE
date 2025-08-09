import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Award, Save, User, Mail, Phone, GraduationCap, BookOpen } from 'lucide-react';
import { teacherAwardCategories, awardTypes } from '../../data/mockData';

const TeacherNomination = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    teacher_name: '',
    category: '',
    award_type: '',
    email: '',
    phone: '',
    experience_years: '',
    current_position: '',
    qualifications: '',
    subjects_taught: '',
    achievements: '',
    nomination_letter: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Reset award_type when category changes
    if (field === 'category') {
      setFormData(prev => ({
        ...prev,
        award_type: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const nominationData = {
        ...formData,
        subjects_taught: formData.subjects_taught.split(',').map(s => s.trim()).filter(s => s),
        experience_years: parseInt(formData.experience_years)
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(nominationData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        teacher_name: '',
        category: '',
        award_type: '',
        email: '',
        phone: '',
        experience_years: '',
        current_position: '',
        qualifications: '',
        subjects_taught: '',
        achievements: '',
        nomination_letter: ''
      });
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Nomination failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const availableAwards = formData.category ? awardTypes[formData.category] || [] : [];
  const nominationFee = 250; // ₹250 per nomination

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Nominate Teacher for Awards
          </CardTitle>
          <p className="text-gray-600">
            Submit nominations for outstanding teachers. Nomination fee: ₹{nominationFee} per teacher.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Teacher nomination submitted successfully!
                </AlertDescription>
              </Alert>
            )}

            {/* Teacher Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Teacher Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher_name">Teacher Name *</Label>
                  <Input
                    id="teacher_name"
                    value={formData.teacher_name}
                    onChange={(e) => handleChange('teacher_name', e.target.value)}
                    placeholder="Enter teacher's full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current_position">Current Position *</Label>
                  <Input
                    id="current_position"
                    value={formData.current_position}
                    onChange={(e) => handleChange('current_position', e.target.value)}
                    placeholder="e.g., Senior Mathematics Teacher"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="teacher@school.edu.in"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="9876543210"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience_years">Years of Experience *</Label>
                  <Input
                    id="experience_years"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.experience_years}
                    onChange={(e) => handleChange('experience_years', e.target.value)}
                    placeholder="15"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subjects_taught">Subjects Taught *</Label>
                  <Input
                    id="subjects_taught"
                    value={formData.subjects_taught}
                    onChange={(e) => handleChange('subjects_taught', e.target.value)}
                    placeholder="Mathematics, Physics (comma separated)"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualifications">Qualifications *</Label>
                <Input
                  id="qualifications"
                  value={formData.qualifications}
                  onChange={(e) => handleChange('qualifications', e.target.value)}
                  placeholder="M.Sc Mathematics, B.Ed, Ph.D"
                  required
                />
              </div>
            </div>

            {/* Award Category Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Award className="w-5 h-5" />
                Award Category
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Award Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select award category" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherAwardCategories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Specific Award *</Label>
                  <Select 
                    value={formData.award_type} 
                    onValueChange={(value) => handleChange('award_type', value)}
                    disabled={!formData.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select specific award" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAwards.map(award => (
                        <SelectItem key={award.value} value={award.value}>
                          {award.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Achievements and Nomination Letter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Nomination Details
              </h3>

              <div className="space-y-2">
                <Label htmlFor="achievements">Key Achievements *</Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements}
                  onChange={(e) => handleChange('achievements', e.target.value)}
                  placeholder="List major achievements, awards, recognitions, and contributions..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomination_letter">Nomination Letter *</Label>
                <Textarea
                  id="nomination_letter"
                  value={formData.nomination_letter}
                  onChange={(e) => handleChange('nomination_letter', e.target.value)}
                  placeholder="Write a detailed nomination letter explaining why this teacher deserves the award..."
                  rows={6}
                  required
                />
              </div>
            </div>

            {/* Fee Information */}
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-purple-800">Nomination Fee</h4>
                    <p className="text-purple-700">Per teacher nomination</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 text-lg px-3 py-1">
                    ₹{nominationFee}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Submit Nomination
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

export default TeacherNomination;