import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Copy, Download, RefreshCw, Ticket, CheckCircle } from 'lucide-react';
import { mockVotingTokens } from '../../data/mockData';

const VotingTokens = () => {
  const [tokenCount, setTokenCount] = useState(100);
  const [generatedTokens, setGeneratedTokens] = useState(mockVotingTokens);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copiedToken, setCopiedToken] = useState('');

  const generateTokens = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate random tokens
      const newTokens = [];
      for (let i = 0; i < tokenCount; i++) {
        const token = Math.random().toString(36).substring(2, 10).toUpperCase();
        newTokens.push(token);
      }
      
      setGeneratedTokens([...generatedTokens, ...newTokens]);
      setSuccess(true);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Token generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToken = async (token) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(''), 2000);
    } catch (error) {
      console.error('Failed to copy token:', error);
    }
  };

  const copyAllTokens = async () => {
    try {
      const tokensText = generatedTokens.join('\n');
      await navigator.clipboard.writeText(tokensText);
      setCopiedToken('all');
      setTimeout(() => setCopiedToken(''), 2000);
    } catch (error) {
      console.error('Failed to copy tokens:', error);
    }
  };

  const downloadTokens = () => {
    const tokensText = generatedTokens.join('\n');
    const blob = new Blob([tokensText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voting-tokens-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Voting Token Management</h2>
        <p className="text-gray-600">Generate and manage voting tokens for public teacher award voting</p>
      </div>

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="w-4 h-4" />
          <AlertDescription className="text-green-800">
            {tokenCount} voting tokens generated successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Token Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            Generate New Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="space-y-2">
              <Label htmlFor="tokenCount">Number of Tokens</Label>
              <Input
                id="tokenCount"
                type="number"
                min="1"
                max="1000"
                value={tokenCount}
                onChange={(e) => setTokenCount(parseInt(e.target.value) || 100)}
                className="w-32"
              />
            </div>
            
            <Button 
              onClick={generateTokens}
              disabled={loading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4" />
                  Generate Tokens
                </div>
              )}
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">How Voting Tokens Work</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Each token allows one vote for teacher nominations</li>
              <li>• Tokens are single-use and expire after the voting period</li>
              <li>• Distribute tokens to community members for fair voting</li>
              <li>• Track token usage through the voting system</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Generated Tokens */}
      {generatedTokens.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                Generated Tokens ({generatedTokens.length})
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={copyAllTokens}
                  className="flex items-center gap-2"
                >
                  {copiedToken === 'all' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  Copy All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={downloadTokens}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {generatedTokens.map((token, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                >
                  <code className="font-mono text-sm font-semibold">{token}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToken(token)}
                    className="ml-2 p-1 h-6 w-6"
                  >
                    {copiedToken === token ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Token Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Generated</p>
                <p className="text-3xl font-bold text-gray-900">{generatedTokens.length}</p>
              </div>
              <Ticket className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tokens Used</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-3xl font-bold text-gray-900">{generatedTokens.length}</p>
              </div>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {generatedTokens.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Ticket className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No Tokens Generated Yet</h3>
            <p className="text-gray-600 mb-4">Generate voting tokens to enable public voting for teacher nominations.</p>
            <Button onClick={() => setTokenCount(100)}>
              <Ticket className="w-4 h-4 mr-2" />
              Generate First Batch
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VotingTokens;