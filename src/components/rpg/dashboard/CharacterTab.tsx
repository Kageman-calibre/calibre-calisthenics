
import AvatarCustomizer from '../AvatarCustomizer';

interface CharacterTabProps {
  onAvatarUpdate: () => void;
}

const CharacterTab = ({ onAvatarUpdate }: CharacterTabProps) => {
  return <AvatarCustomizer onAvatarUpdate={onAvatarUpdate} />;
};

export default CharacterTab;
