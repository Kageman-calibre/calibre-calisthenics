
import { useState } from "react";
import Hero from "../components/Hero";
import WorkoutCategories from "../components/WorkoutCategories";
import FeaturedExercises from "../components/FeaturedExercises";
import TrainingSchedules from "../components/TrainingSchedules";
import ProgressDashboard from "../components/ProgressDashboard";
import UserProfile from "../components/UserProfile";
import NutritionTracker from "../components/NutritionTracker";
import CommunityHub from "../components/CommunityHub";
import MobileFeatures from "../components/MobileFeatures";
import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";
import AIPersonalization from "../components/personalization/AIPersonalization";
import IntegrationHub from "../components/integrations/IntegrationHub";
import PremiumFeatures from "../components/premium/PremiumFeatures";
import TrainerConnection from "../components/social/TrainerConnection";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <Hero />
            <WorkoutCategories />
            <FeaturedExercises />
            <TrainingSchedules />
          </>
        );
      case "workouts":
        return (
          <>
            <WorkoutCategories />
            <FeaturedExercises />
            <TrainingSchedules />
          </>
        );
      case "progress":
        return <ProgressDashboard />;
      case "profile":
        return <UserProfile />;
      case "nutrition":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <NutritionTracker />
            </div>
          </section>
        );
      case "community":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <CommunityHub />
            </div>
          </section>
        );
      case "mobile":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <MobileFeatures />
            </div>
          </section>
        );
      case "analytics":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <AnalyticsDashboard />
            </div>
          </section>
        );
      case "ai":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <AIPersonalization />
            </div>
          </section>
        );
      case "integrations":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <IntegrationHub />
            </div>
          </section>
        );
      case "premium":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <PremiumFeatures />
            </div>
          </section>
        );
      case "trainers":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <TrainerConnection />
            </div>
          </section>
        );
      default:
        return (
          <>
            <Hero />
            <WorkoutCategories />
            <FeaturedExercises />
            <TrainingSchedules />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <main>
        {renderSection()}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
