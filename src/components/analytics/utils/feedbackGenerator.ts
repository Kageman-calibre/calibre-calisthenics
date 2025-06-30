
// Generate calisthenics-specific feedback based on skill type
export const generateCalisthenicsSkillFeedback = (skillType: string) => {
  const skillFeedbackMap: Record<string, { feedback: string[], suggestions: string[], keyFrames: number[] }> = {
    'Muscle-up': {
      feedback: ['Good transition phase detected', 'Strong pull strength shown', 'Dip portion well executed'],
      suggestions: ['Work on smoother transition', 'Reduce kipping if present', 'Focus on chest-to-bar contact'],
      keyFrames: [1.5, 3.2, 5.8, 8.1, 10.5]
    },
    'Human Flag': {
      feedback: ['Good body alignment maintained', 'Core strength evident', 'Grip positioning appropriate'],
      suggestions: ['Engage lats more actively', 'Keep legs straight and together', 'Maintain hollow body position'],
      keyFrames: [2.0, 5.0, 8.0, 12.0, 15.0]
    },
    'Planche': {
      feedback: ['Shoulder protraction visible', 'Hollow body maintained', 'Good lean angle achieved'],
      suggestions: ['Increase shoulder strength', 'Work on wrist flexibility', 'Progress to longer holds'],
      keyFrames: [3.0, 6.0, 9.0, 12.0, 15.0]
    },
    'Front Lever': {
      feedback: ['Strong lat engagement', 'Body line maintained well', 'Good shoulder depression'],
      suggestions: ['Focus on posterior chain strength', 'Keep shoulders away from ears', 'Maintain neutral spine'],
      keyFrames: [2.5, 5.0, 7.5, 10.0, 12.5]
    },
    'Back Lever': {
      feedback: ['Good shoulder flexibility shown', 'Core engagement evident', 'Straight body line achieved'],
      suggestions: ['Improve shoulder mobility', 'Strengthen rear delts', 'Work on bicep flexibility'],
      keyFrames: [2.0, 4.5, 7.0, 9.5, 12.0]
    },
    'Handstand': {
      feedback: ['Good body alignment', 'Straight line maintained', 'Proper hand placement'],
      suggestions: ['Engage fingertips for balance', 'Keep shoulders over hands', 'Maintain hollow body'],
      keyFrames: [5.0, 10.0, 15.0, 20.0, 25.0]
    },
    'Handstand Push-up': {
      feedback: ['Full range of motion achieved', 'Good body control', 'Strong pressing power'],
      suggestions: ['Keep body straight throughout', 'Control the descent', 'Full lockout at top'],
      keyFrames: [1.8, 4.2, 6.8, 9.1, 11.5]
    },
    'Pistol Squat': {
      feedback: ['Good unilateral strength', 'Balance maintained well', 'Full depth achieved'],
      suggestions: ['Work on ankle mobility', 'Keep extended leg straight', 'Control the ascent'],
      keyFrames: [2.2, 4.8, 7.3, 9.7, 12.1]
    },
    'L-Sit': {
      feedback: ['Good compression strength', 'Shoulders depressed properly', 'Legs parallel to ground'],
      suggestions: ['Increase hold time gradually', 'Keep legs straight', 'Push hands down actively'],
      keyFrames: [3.0, 8.0, 13.0, 18.0, 23.0]
    },
    'Dragon Flag': {
      feedback: ['Exceptional core control', 'Full body tension maintained', 'Controlled movement'],
      suggestions: ['Focus on slow negatives', 'Keep body straight', 'Strengthen core progressively'],
      keyFrames: [2.5, 5.5, 8.0, 10.5, 13.0]
    }
  };

  return skillFeedbackMap[skillType] || {
    feedback: ['Calisthenics skill analysis complete', 'Movement pattern recognized', 'Form evaluation done'],
    suggestions: ['Focus on progressive skill development', 'Master prerequisites first', 'Maintain proper form'],
    keyFrames: [2.0, 5.0, 8.0, 11.0, 14.0]
  };
};
