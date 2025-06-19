
import { useState } from "react";
import Hero from "../components/Hero";
import WorkoutCategories from "../components/WorkoutCategories";
import FeaturedExercises from "../components/FeaturedExercises";
import TrainingSchedules from "../components/TrainingSchedules";
import ProgressDashboard from "../components/ProgressDashboard";
import UserProfile from "../components/UserProfile";
import NutritionTracker from "../components/NutritionTracker";
import EnhancedNutritionTracker from "../components/nutrition/EnhancedNutritionTracker";
import CommunityHub from "../components/CommunityHub";
import SocialHub from "../components/social/SocialHub";
import MobileFeatures from "../components/MobileFeatures";
import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";
import DetailedAnalytics from "../components/analytics/DetailedAnalytics";
import AIPersonalization from "../components/personalization/AIPersonalization";
import IntegrationHub from "../components/integrations/IntegrationHub";
import PremiumFeatures from "../components/premium/PremiumFeatures";
import TrainerConnection from "../components/social/TrainerConnection";
import WorkoutTemplates from "../components/templates/WorkoutTemplates";
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
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <WorkoutTemplates />
              </div>
            </section>
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
      case "templates":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <WorkoutTemplates />
            </div>
          </section>
        );
      case "progress":
        return <ProgressDashboard />;
      case "profile":
        return <UserProfile />;
      case "nutrition":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <EnhancedNutritionTracker />
            </div>
          </section>
        );
      case "community":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <SocialHub />
            </div>
          </section>
        );
      case "social":
        return (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <SocialHub />
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
              <DetailedAnalytics />
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
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        {renderSection()}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
