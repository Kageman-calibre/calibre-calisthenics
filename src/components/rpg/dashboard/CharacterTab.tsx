
import EnhancedAvatarCustomizer from '../EnhancedAvatarCustomizer';

interface CharacterTabProps {
  onAvatarUpdate: () => void;
}

const CharacterTab = ({ onAvatarUpdate }: CharacterTabProps) => {
  return <EnhancedAvatarCustomizer onAvatarUpdate={onAvatarUpdate} />;
};

export default CharacterTab;
