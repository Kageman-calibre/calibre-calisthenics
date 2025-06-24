
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import RPGDashboard from '../components/rpg/RPGDashboard';
import LevelUpNotification from '../components/rpg/LevelUpNotification';
import { useRPGSystem } from '../hooks/useRPGSystem';

const RPGPage = () => {
  const { showLevelUp, levelUpData, closeLevelUp } = useRPGSystem();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              RPG Character System
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Level up your fitness journey with XP, achievements, and character customization
            </p>
          </div>

          <RPGDashboard />
        </div>
      </div>
      
      <Footer />
      
      <LevelUpNotification
        isVisible={showLevelUp}
        newLevel={levelUpData.newLevel}
        newTitle={levelUpData.newTitle}
        xpGained={levelUpData.xpGained}
        onClose={closeLevelUp}
      />
    </div>
  );
};

export default RPGPage;
