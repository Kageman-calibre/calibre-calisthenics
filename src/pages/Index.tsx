
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
