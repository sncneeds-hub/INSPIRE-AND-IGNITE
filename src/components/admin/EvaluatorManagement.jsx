import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { UserPlus, Edit, Trash2, Eye, Mail, User } from 'lucide-react';
import { drawingCategories, competitionLevels } from '../../data/mockData';

const EvaluatorManagement = () => {
  const [evaluators, setEvaluators] = useState([
    {
      id: 'eval-001',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@eval.com',
      expertise: 'Art Education & Child Psychology',
      assigned_categories: ['pre-school', 'junior-artists'],
      assigned_levels: ['school', 'taluk'],
      is_active: true,
      created_at: '2025-01-15'
    },
    {
      id: 'eval-002',
      name: 'Prof. Rajesh Kumar',
      email: 'rajesh.kumar@eval.com',
      expertise: 'Fine Arts & Cultural Studies',
      assigned_categories: ['young-creators', 'aspiring-innovators'],
      assigned_levels: ['district', 'state'],
      is_active: true,
      created_at: '2025-01-16'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    expertise: '',
    assigned_categories: [],
    assigned_levels: []
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingId) {
        // Update existing evaluator
        setEvaluators(evaluators.map(eval => 
          eval.id === editingId 
            ? { ...eval, ...formData, password: undefined }
            : eval
        ));
      } else {
        // Create new evaluator
        const newEvaluator = {
          id: `eval-${Date.now()}`,
          ...formData,
          password: undefined, // Don't store password in state
          is_active: true,
          created_at: new Date().toISOString().split('T')[0]
        };
        setEvaluators([...evaluators, newEvaluator]);
      }

      setSuccess(true);
      resetForm();
      setShowForm(false);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Evaluator operation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      expertise: '',
      assigned_categories: [],
      assigned_levels: []
    });
    setEditingId(null);
  };

  const handleEdit = (evaluator) => {
    setFormData({
      name: evaluator.name,
      email: evaluator.email,
      password: '',
      expertise: evaluator.expertise,
      assigned_categories: evaluator.assigned_categories,
      assigned_levels: evaluator.assigned_levels
    });
    setEditingId(evaluator.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this evaluator?')) {
      setEvaluators(evaluators.filter(eval => eval.id !== id));
    }
  };

  const toggleStatus = async (id) => {
    setEvaluators(evaluators.map(eval => 
      eval.id === id ? { ...eval, is_active: !eval.is_active } : eval
    ));
  };

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        assigned_categories: [...prev.assigned_categories, category]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        assigned_categories: prev.assigned_categories.filter(c => c !== category)
      }));
    }
  };

  const handleLevelChange = (level, checked) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        assigned_levels: [...prev.assigned_levels, level]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        assigned_levels: prev.assigned_levels.filter(l => l !== level)
      }));
    }
  };

  return (
    <div className="space-y-6">
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            Evaluator {editingId ? 'updated' : 'created'} successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Evaluator Management</h2>
          <p className="text-gray-600">Create and manage evaluator accounts for competitions</p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              onClick={resetForm}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Evaluator
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Evaluator' : 'Create New Evaluator'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Dr. John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john.doe@eval.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder={editingId ? "Leave blank to keep current password" : "Enter password"}
                  required={!editingId}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expertise">Area of Expertise *</Label>
                <Textarea
                  id="expertise"
                  value={formData.expertise}
                  onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))}
                  placeholder="e.g., Art Education, Child Psychology, Fine Arts"
                  rows={2}
                  required
                />
              </div>

              {/* Category Assignment */}
              <div className="space-y-2">
                <Label>Assigned Categories</Label>
                <div className="grid grid-cols-2 gap-2">
                  {drawingCategories.map(category => (
                    <label key={category.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.assigned_categories.includes(category.value)}
                        onChange={(e) => handleCategoryChange(category.value, e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level Assignment */}
              <div className="space-y-2">
                <Label>Assigned Levels</Label>
                <div className="grid grid-cols-2 gap-2">
                  {competitionLevels.map(level => (
                    <label key={level.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.assigned_levels.includes(level.value)}
                        onChange={(e) => handleLevelChange(level.value, e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingId ? 'Updating...' : 'Creating...'}
                    </div>
                  ) : (
                    editingId ? 'Update Evaluator' : 'Create Evaluator'
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Evaluators List */}
      <div className="grid gap-4">
        {evaluators.map(evaluator => (
          <Card key={evaluator.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{evaluator.name}</h3>
                      <p className="text-gray-600 flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {evaluator.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">
                      <strong>Expertise:</strong> {evaluator.expertise}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium">Categories:</span>
                      {evaluator.assigned_categories.map(category => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {drawingCategories.find(c => c.value === category)?.label}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium">Levels:</span>
                      {evaluator.assigned_levels.map(level => (
                        <Badge key={level} variant="outline" className="text-xs">
                          {competitionLevels.find(l => l.value === level)?.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={evaluator.is_active ? 'default' : 'secondary'}>
                    {evaluator.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(evaluator)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStatus(evaluator.id)}
                    className={evaluator.is_active ? 'text-red-600' : 'text-green-600'}
                  >
                    {evaluator.is_active ? 'Deactivate' : 'Activate'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(evaluator.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {evaluators.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <UserPlus className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No Evaluators Yet</h3>
            <p className="text-gray-600 mb-4">Create evaluator accounts to start managing competitions.</p>
            <Button onClick={() => setShowForm(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add First Evaluator
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EvaluatorManagement;