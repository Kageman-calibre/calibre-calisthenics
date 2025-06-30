
import { useState } from 'react';
import { AnalysisResult, AdvancedAnalysisResult, EnhancedFeedbackData } from './types';
import { detectCalisthenicsSkill } from './utils/skillDetection';
import { generateCalisthenicsSkillFeedback } from './utils/feedbackGenerator';
import { generateCalisthenicsAdvancedAnalysis } from './utils/advancedAnalysisGenerator';
import { generateEnhancedFeedback } from './utils/enhancedFeedbackGenerator';

export const useVideoAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [advancedAnalysis, setAdvancedAnalysis] = useState<AdvancedAnalysisResult | null>(null);
  const [enhancedFeedback, setEnhancedFeedback] = useState<EnhancedFeedbackData | null>(null);

  const analyzeVideo = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 8;
      });
    }, 400);

    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Detect calisthenics skill dynamically
      const detectedSkill = detectCalisthenicsSkill();
      const skillData = generateCalisthenicsSkillFeedback(detectedSkill);
      const formScore = 70 + Math.floor(Math.random() * 25); // Calisthenics skills typically score higher when achieved
      const holdTime = 5 + Math.floor(Math.random() * 15); // For static holds
      const repCount = ['Muscle-up', 'Handstand Push-up', 'Pistol Squat'].includes(detectedSkill) ? 
        3 + Math.floor(Math.random() * 8) : holdTime;
      
      setAnalysisResult({
        exercise: detectedSkill,
        formScore,
        repCount,
        tempo: detectedSkill.includes('Hold') || detectedSkill.includes('Sit') || detectedSkill.includes('Flag') || 
               detectedSkill.includes('Lever') || detectedSkill.includes('Planche') || detectedSkill.includes('Handstand') ? 
               'Static Hold' : '3-1-3-1',
        feedback: skillData.feedback,
        suggestions: skillData.suggestions,
        keyFrames: skillData.keyFrames
      });

      setAdvancedAnalysis(generateCalisthenicsAdvancedAnalysis(detectedSkill));
      setEnhancedFeedback(generateEnhancedFeedback(detectedSkill, formScore));
    }, 5000);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setAdvancedAnalysis(null);
    setEnhancedFeedback(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
  };

  return {
    isAnalyzing,
    analysisProgress,
    analysisResult,
    advancedAnalysis,
    enhancedFeedback,
    analyzeVideo,
    resetAnalysis
  };
};
