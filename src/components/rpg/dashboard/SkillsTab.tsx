
import SkillRequirements from '../SkillRequirements';

interface SkillsTabProps {
  currentLevel: number;
}

const SkillsTab = ({ currentLevel }: SkillsTabProps) => {
  return <SkillRequirements currentLevel={currentLevel} />;
};

export default SkillsTab;
