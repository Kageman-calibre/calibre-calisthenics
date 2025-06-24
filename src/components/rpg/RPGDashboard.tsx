
import { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import XPProgressBar from './XPProgressBar';
import TabNavigation from './dashboard/TabNavigation';
import CharacterTab from './dashboard/CharacterTab';
import SkillsTab from './dashboard/SkillsTab';
import BadgesTab from './dashboard/BadgesTab';
import XPRewardsTab from './dashboard/XPRewardsTab';
import DailyQuestsTab from './dashboard/DailyQuestsTab';
import { useRPGData } from './dashboard/useRPGData';

const RPGDashboard = () => {
  const [activeTab, setActiveTab] = useState('character');
  const { userBadges, xpRewards, currentLevel, loading, fetchUserData, awardTestXP } = useRPGData();

  return (
    <div className="space-y-6">
      {/* XP Progress Bar */}
      <XPProgressBar />

      {/* Main RPG Dashboard */}
      <div className="w-full">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'character' && (
            <CharacterTab onAvatarUpdate={fetchUserData} />
          )}

          {activeTab === 'skills' && (
            <SkillsTab currentLevel={currentLevel} />
          )}

          {activeTab === 'badges' && (
            <BadgesTab userBadges={userBadges} loading={loading} />
          )}

          {activeTab === 'rewards' && (
            <XPRewardsTab xpRewards={xpRewards} onTestXP={awardTestXP} />
          )}

          {activeTab === 'quests' && (
            <DailyQuestsTab />
          )}
        </div>
      </div>
    </div>
  );
};

export default RPGDashboard;
