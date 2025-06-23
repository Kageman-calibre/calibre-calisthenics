
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Play, Pause, RotateCcw, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface AnalysisResult {
  exercise: string;
  formScore: number;
  repCount: number;
  tempo: string;
  feedback: string[];
  suggestions: string[];
  keyFrames: number[];
}

const VideoAnalytics = () => {
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideo(videoUrl);
      setAnalysisResult(null);
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
        return prev + 10;
      });
    }, 300);

    // Simulate analysis (in real implementation, this would call an AI service)
    setTimeout(() => {
      setIsAnalyzing(false);
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
    }, 3500);
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
          <span className="text-green-400 text-sm font-medium">Video Analytics</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Movement
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Analysis
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Upload your workout videos to get AI-powered form analysis and personalized feedback
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

      {/* Video Player and Analysis */}
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
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Form'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Analyzing movement patterns...</div>
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

                  {/* Feedback */}
                  <div>
                    <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      What You Did Well
                    </h4>
                    <ul className="space-y-2">
                      {analysisResult.feedback.map((item, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggestions */}
                  <div>
                    <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {analysisResult.suggestions.map((item, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-orange-400 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tempo */}
                  <div>
                    <div className="text-sm text-gray-400">Tempo</div>
                    <div className="text-lg font-medium text-white">{analysisResult.tempo}</div>
                    <div className="text-xs text-gray-500">Down-Pause-Up-Pause (seconds)</div>
                  </div>
                </div>
              )}

              {!isAnalyzing && !analysisResult && (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Click "Analyze Form" to get detailed feedback on your technique</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload New Video */}
      {uploadedVideo && (
        <div className="text-center">
          <Button 
            onClick={() => {
              setUploadedVideo(null);
              setAnalysisResult(null);
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
