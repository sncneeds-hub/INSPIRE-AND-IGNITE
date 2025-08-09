import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Trophy, Plus, Save, Trash2, Award } from 'lucide-react';
import { drawingCategories, competitionLevels } from '../../data/mockData';

const WinnerSubmission = ({ participants, onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('school');
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const addWinner = () => {
    const newWinner = {
      id: Date.now(),
      name: '',
      grade: '',
      age: '',
      theme: '',
      position: winners.length + 1,
      advances_to_next: false,
      artwork_image_url: ''
    };
    setWinners([...winners, newWinner]);
  };

  const updateWinner = (id, field, value) => {
    setWinners(winners.map(winner => 
      winner.id === id ? { ...winner, [field]: value } : winner
    ));
  };

  const removeWinner = (id) => {
    setWinners(winners.filter(winner => winner.id !== id));
    // Reorder positions
    const updatedWinners = winners.filter(winner => winner.id !== id);
    updatedWinners.forEach((winner, index) => {
      winner.position = index + 1;
    });
    setWinners(updatedWinners);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submissionData = {
        category: selectedCategory,
        level: selectedLevel,
        winners: winners.map(({ id, ...winner }) => winner)
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit(submissionData);
      setSuccess(true);
      setWinners([]);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Winner submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTheme = (categoryValue) => {
    const themes = {
      'pre-school': 'My Dream World',
      'junior-artists': 'Nature & Me: Karnataka\'s Green Beauty',
      'young-creators': 'Future Karnataka: Smart Cities & Sustainable Living',
      'aspiring-innovators': 'Cultural Tapestry of Karnataka: Unity in Diversity',
      'master-visionaries': 'Innovation & Leadership in Modern Karnataka'
    };
    return themes[categoryValue] || '';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Submit Winners
          </CardTitle>
          <p className="text-gray-600">
            Add winner details for progression to the next competition level.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Winners submitted successfully!
                </AlertDescription>
              </Alert>
            )}

            {/* Category and Level Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {drawingCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label} ({category.ages})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Competition Level</Label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
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
            </div>

            {/* Theme Display */}
            {selectedCategory && (
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">Competition Theme</h4>
                  <p className="text-amber-700">{getCategoryTheme(selectedCategory)}</p>
                </CardContent>
              </Card>
            )}

            {/* Winners List */}
            {winners.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Winners</h3>
                  <Badge variant="outline">{winners.length} Winner{winners.length !== 1 ? 's' : ''}</Badge>
                </div>

                {winners.map((winner, index) => (
                  <Card key={winner.id} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        <h4 className="font-semibold">Position {winner.position}</h4>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeWinner(winner.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Student Name *</Label>
                        <Input
                          value={winner.name}
                          onChange={(e) => updateWinner(winner.id, 'name', e.target.value)}
                          placeholder="Enter student name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Grade/Class *</Label>
                        <Input
                          value={winner.grade}
                          onChange={(e) => updateWinner(winner.id, 'grade', e.target.value)}
                          placeholder="e.g., 5th Grade, LKG"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Age *</Label>
                        <Input
                          type="number"
                          min="3"
                          max="20"
                          value={winner.age}
                          onChange={(e) => updateWinner(winner.id, 'age', e.target.value)}
                          placeholder="Age"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Artwork Theme</Label>
                        <Input
                          value={winner.theme}
                          onChange={(e) => updateWinner(winner.id, 'theme', e.target.value)}
                          placeholder="Theme interpretation"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center space-x-2">
                      <Checkbox
                        id={`advance-${winner.id}`}
                        checked={winner.advances_to_next}
                        onCheckedChange={(checked) => updateWinner(winner.id, 'advances_to_next', checked)}
                      />
                      <Label htmlFor={`advance-${winner.id}`} className="text-sm">
                        Advances to next level
                      </Label>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Add Winner Button */}
            {selectedCategory && winners.length < 3 && (
              <Button
                type="button"
                variant="outline"
                onClick={addWinner}
                className="w-full border-dashed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Winner (Max 3 per category)
              </Button>
            )}

            {/* Submit Button */}
            {winners.length > 0 && (
              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Submit Winners
                    </div>
                  )}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WinnerSubmission;