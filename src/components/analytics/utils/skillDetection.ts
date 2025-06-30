
// Calisthenics-specific skill detection
export const detectCalisthenicsSkill = (): string => {
  const calisthenicsSkills = [
    'Muscle-up', 'Human Flag', 'Planche', 'Front Lever', 'Back Lever',
    'Handstand', 'Handstand Push-up', 'Archer Pull-up', 'One Arm Pull-up',
    'Pistol Squat', 'Dragon Flag', 'L-Sit', 'V-Sit', 'Maltese',
    'Iron Cross', 'Straddle Planche', 'Full Planche', 'Lever Pull-up',
    'Muscle-up Transition', 'Strict Muscle-up', 'Kipping Muscle-up',
    'Wall Handstand', 'Freestanding Handstand', 'Hollow Body Hold',
    'Superman Hold', 'Bridge', 'Crow Pose', 'Side Lever'
  ];
  return calisthenicsSkills[Math.floor(Math.random() * calisthenicsSkills.length)];
};
