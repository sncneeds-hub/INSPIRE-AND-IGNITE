import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Vote, CheckCircle, User, School, Award, Ticket } from 'lucide-react';
import { mockVotingNominations } from '../../data/mockData';

const PublicVoting = () => {
  const [votingToken, setVotingToken] = useState('');
  const [tokenValidated, setTokenValidated] = useState(false);
  const [selectedNomination, setSelectedNomination] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [nominations] = useState(mockVotingNominations);

  const validateToken = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, this would call the API
      if (votingToken.length === 8) {
        setTokenValidated(true);
      } else {
        setError('Invalid voting token. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to validate token. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const castVote = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedNomination) {
        setSuccess(true);
        setVotingToken('');
        setTokenValidated(false);
        setSelectedNomination('');
      } else {
        setError('Please select a nomination to vote for.');
      }
    } catch (err) {
      setError('Failed to cast vote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'academic-excellence': 'bg-blue-100 text-blue-800',
      'inspirational-teaching': 'bg-rose-100 text-rose-800',
      'innovation-growth': 'bg-purple-100 text-purple-800',
      'lifetime-excellence': 'bg-amber-100 text-amber-800',
      'social-contribution': 'bg-emerald-100 text-emerald-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vote Cast Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for participating in the teacher awards voting. Your vote has been recorded.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              Vote Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Vote className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Public Voting</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Vote for outstanding teachers nominated for the Pillars of Excellence Awards
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!tokenValidated ? (
            /* Token Validation */
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Enter Your Voting Token
                </CardTitle>
                <p className="text-gray-600">
                  Enter the 8-character voting token you received to participate in voting.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="token">Voting Token</Label>
                  <div className="flex gap-4">
                    <Input
                      id="token"
                      value={votingToken}
                      onChange={(e) => setVotingToken(e.target.value.toUpperCase())}
                      placeholder="Enter 8-character token"
                      maxLength={8}
                      className="font-mono text-lg tracking-wider"
                    />
                    <Button 
                      onClick={validateToken}
                      disabled={loading || votingToken.length !== 8}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Validating...
                        </div>
                      ) : (
                        'Validate Token'
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">How to Vote</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>1. Enter your 8-character voting token</li>
                    <li>2. Browse through the teacher nominations</li>
                    <li>3. Select the teacher you want to vote for</li>
                    <li>4. Cast your vote - each token allows one vote only</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Voting Interface */
            <div className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="w-4 h-4" />
                <AlertDescription className="text-green-800">
                  Token validated successfully! You can now cast your vote.
                </AlertDescription>
              </Alert>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Select a Teacher to Vote For</CardTitle>
                  <p className="text-gray-600">
                    Choose one teacher nomination to support with your vote.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {nominations.map(nomination => (
                    <Card 
                      key={nomination.nomination_id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedNomination === nomination.nomination_id 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedNomination(nomination.nomination_id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{nomination.teacher_name}</h3>
                                <p className="text-gray-600 flex items-center gap-1">
                                  <School className="w-4 h-4" />
                                  {nomination.school_name} • {nomination.district}
                                </p>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600">Award Category</p>
                                <Badge className={getCategoryColor(nomination.category)}>
                                  {nomination.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Experience</p>
                                <p className="font-semibold">{nomination.experience_years} years</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Current Votes</p>
                                <p className="font-semibold flex items-center gap-1">
                                  <Vote className="w-4 h-4 text-blue-500" />
                                  {nomination.public_votes}
                                </p>
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm text-gray-600 mb-1">Key Achievements</p>
                              <p className="text-gray-700">{nomination.achievements}</p>
                            </div>
                          </div>

                          <div className="ml-4">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedNomination === nomination.nomination_id
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedNomination === nomination.nomination_id && (
                                <CheckCircle className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Vote Button */}
              <div className="text-center">
                <Button 
                  onClick={castVote}
                  disabled={loading || !selectedNomination}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-4 text-lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Casting Vote...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Vote className="w-5 h-5" />
                      Cast My Vote
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicVoting;