import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Play, Pause, RotateCcw, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import VideoAnnotator from './VideoAnnotator';
import AdvancedMovementAnalysis from './AdvancedMovementAnalysis';
import EnhancedFeedbackSystem from './EnhancedFeedbackSystem';

interface AnalysisResult {
  exercise: string;
  formScore: number;
  repCount: number;
  tempo: string;
  feedback: string[];
  suggestions: string[];
  keyFrames: number[];
}

interface AdvancedAnalysisResult {
  jointAngles: Array<{
    joint: string;
    angle: number;
    idealRange: [number, number];
    status: 'good' | 'warning' | 'poor';
  }>;
  movementSymmetry: {
    leftSide: number;
    rightSide: number;
    asymmetryPercentage: number;
    status: 'balanced' | 'slight' | 'significant';
  };
  rangeOfMotion: Array<{
    exercise: string;
    achieved: number;
    optimal: number;
    percentage: number;
  }>;
  movementVelocity: {
    concentric: number;
    eccentric: number;
    optimal: boolean;
  };
  injuryRisk: {
    level: 'low' | 'moderate' | 'high';
    factors: string[];
    score: number;
  };
}

interface EnhancedFeedbackData {
  realTimeFeedback: Array<{
    timestamp: number;
    message: string;
    type: 'correction' | 'encouragement' | 'warning';
    severity: 'low' | 'medium' | 'high';
  }>;
  progressiveRecommendation: {
    currentLevel: string;
    nextLevel: string;
    requirements: string[];
    estimatedTimeframe: string;
    difficulty: number;
  };
  injuryRiskAlerts: Array<{
    risk: string;
    severity: 'low' | 'medium' | 'high';
    prevention: string[];
    immediateAction: string;
  }>;
  movementComparison: {
    userScore: number;
    idealScore: number;
    deviations: Array<{
      phase: string;
      issue: string;
      correction: string;
    }>;
  };
  overallImprovement: {
    score: number;
    keyAreas: string[];
    priority: string;
  };
}

const VideoAnalytics = () => {
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [advancedAnalysis, setAdvancedAnalysis] = useState<AdvancedAnalysisResult | null>(null);
  const [enhancedFeedback, setEnhancedFeedback] = useState<EnhancedFeedbackData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideo(videoUrl);
      setAnalysisResult(null);
      setAdvancedAnalysis(null);
      setEnhancedFeedback(null);
    }
  };

  const analyzeVideo = async () => {
    if (!uploadedVideo) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate video analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 8;
      });
    }, 400);

    // Simulate comprehensive analysis (in real implementation, this would call an AI service)
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Basic analysis results
      setAnalysisResult({
        exercise: 'Dips',
        formScore: 78,
        repCount: 12,
        tempo: '2-1-2-1',
        feedback: [
          'Good depth on most repetitions',
          'Slight forward lean detected',
          'Consistent tempo maintained'
        ],
        suggestions: [
          'Focus on keeping torso more upright',
          'Ensure full lockout at the top',
          'Control the descent more slowly'
        ],
        keyFrames: [2.5, 5.1, 7.8, 10.2, 12.9]
      });

      // Advanced movement analysis
      setAdvancedAnalysis({
        jointAngles: [
          { joint: 'Shoulder', angle: 165, idealRange: [160, 180], status: 'good' },
          { joint: 'Elbow', angle: 140, idealRange: [90, 160], status: 'good' },
          { joint: 'Hip', angle: 175, idealRange: [170, 180], status: 'warning' },
          { joint: 'Knee', angle: 178, idealRange: [175, 180], status: 'good' }
        ],
        movementSymmetry: {
          leftSide: 85,
          rightSide: 92,
          asymmetryPercentage: 8.2,
          status: 'slight'
        },
        rangeOfMotion: [
          { exercise: 'Dip Descent', achieved: 145, optimal: 160, percentage: 91 },
          { exercise: 'Full Extension', achieved: 175, optimal: 180, percentage: 97 }
        ],
        movementVelocity: {
          concentric: 1.8,
          eccentric: 2.2,
          optimal: true
        },
        injuryRisk: {
          level: 'low',
          factors: ['Slight forward lean', 'Minor asymmetry detected'],
          score: 25
        }
      });

      // Enhanced feedback system
      setEnhancedFeedback({
        realTimeFeedback: [
          { timestamp: 3.2, message: 'Maintain upright torso position', type: 'correction', severity: 'medium' },
          { timestamp: 6.8, message: 'Excellent depth achieved!', type: 'encouragement', severity: 'low' },
          { timestamp: 9.1, message: 'Control the descent more slowly', type: 'correction', severity: 'low' },
          { timestamp: 11.5, message: 'Good lockout at the top', type: 'encouragement', severity: 'low' },
          { timestamp: 14.2, message: 'Watch for forward lean', type: 'warning', severity: 'medium' }
        ],
        progressiveRecommendation: {
          currentLevel: 'Intermediate Dips',
          nextLevel: 'Weighted Dips (5kg)',
          requirements: [
            'Achieve 15 perfect form reps',
            'Eliminate forward lean completely',
            'Maintain 2-second controlled descent'
          ],
          estimatedTimeframe: '2-3 weeks',
          difficulty: 72
        },
        injuryRiskAlerts: [
          {
            risk: 'Shoulder Impingement Risk',
            severity: 'low',
            prevention: [
              'Warm up shoulders thoroughly',
              'Focus on scapular stability',
              'Avoid excessive forward lean'
            ],
            immediateAction: 'Reduce range of motion if shoulder pain occurs'
          }
        ],
        movementComparison: {
          userScore: 78,
          idealScore: 95,
          deviations: [
            {
              phase: 'Descent Phase',
              issue: 'Slight forward lean detected',
              correction: 'Engage core and maintain vertical torso'
            },
            {
              phase: 'Bottom Position',
              issue: 'Inconsistent depth across reps',
              correction: 'Aim for shoulders level with elbows'
            }
          ]
        },
        overallImprovement: {
          score: 82,
          keyAreas: ['Torso Position', 'Movement Consistency', 'Tempo Control'],
          priority: 'Eliminate forward lean'
        }
      });
    }, 5000);
  };

  const handlePlayback = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const getFormScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getFormScoreBadge = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Work';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
          <TrendingUp className="h-4 w-4 text-green-400" />
          <span className="text-green-400 text-sm font-medium">Advanced Video Analytics</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Comprehensive
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Movement Analysis
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          AI-powered comprehensive analysis with advanced movement tracking, injury risk assessment, and personalized feedback
        </p>
      </div>

      {/* Upload Section */}
      {!uploadedVideo && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div 
              className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center hover:border-slate-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Upload Workout Video</h3>
              <p className="text-gray-400 mb-4">
                Drag and drop your video file here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports MP4, MOV, AVI files up to 100MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Player and Basic Analysis */}
      {uploadedVideo && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Player */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Video Player</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <video
                  ref={videoRef}
                  src={uploadedVideo}
                  className="w-full rounded-lg"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <Button onClick={togglePlayPause} variant="outline">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button onClick={resetVideo} variant="outline">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={analyzeVideo} 
                    disabled={isAnalyzing}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Comprehensive Analysis'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Analysis Results */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Performing comprehensive analysis...</div>
                    <Progress value={analysisProgress} className="w-full" />
                    <div className="text-xs text-gray-500 mt-1">{analysisProgress}% complete</div>
                  </div>
                </div>
              )}

              {analysisResult && (
                <div className="space-y-6">
                  {/* Exercise & Form Score */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">{analysisResult.exercise}</h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {getFormScoreBadge(analysisResult.formScore)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">Form Score</div>
                        <div className={`text-2xl font-bold ${getFormScoreColor(analysisResult.formScore)}`}>
                          {analysisResult.formScore}/100
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Rep Count</div>
                        <div className="text-2xl font-bold text-white">{analysisResult.repCount}</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Feedback */}
                  <div>
                    <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Quick Feedback
                    </h4>
                    <ul className="space-y-2">
                      {analysisResult.feedback.slice(0, 2).map((item, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tempo */}
                  <div>
                    <div className="text-sm text-gray-400">Tempo</div>
                    <div className="text-lg font-medium text-white">{analysisResult.tempo}</div>
                  </div>
                </div>
              )}

              {!isAnalyzing && !analysisResult && (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Click "Comprehensive Analysis" to get detailed feedback</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Advanced Analysis Sections */}
      {advancedAnalysis && (
        <AdvancedMovementAnalysis analysisResult={advancedAnalysis} />
      )}

      {enhancedFeedback && (
        <EnhancedFeedbackSystem 
          feedbackData={enhancedFeedback} 
          onPlayback={handlePlayback}
        />
      )}

      {/* Video Annotation Section */}
      {analysisResult && uploadedVideo && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Video Annotation & Download</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Create an annotated version of your video with comprehensive analysis overlays including form scores, 
              movement analysis, real-time feedback, and visual indicators.
            </p>
            <VideoAnnotator videoUrl={uploadedVideo} analysisResult={analysisResult} />
          </CardContent>
        </Card>
      )}

      {/* Upload New Video */}
      {uploadedVideo && (
        <div className="text-center">
          <Button 
            onClick={() => {
              setUploadedVideo(null);
              setAnalysisResult(null);
              setAdvancedAnalysis(null);
              setEnhancedFeedback(null);
              setIsAnalyzing(false);
              setAnalysisProgress(0);
            }}
            variant="outline"
          >
            Upload New Video
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoAnalytics;
