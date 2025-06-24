
import { useState, useEffect, Suspense, lazy } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AdBanner from "../components/ads/AdBanner";
import InterstitialAd from "../components/ads/InterstitialAd";
import { Loading } from "../components/ui/loading";
import LazySection from "../components/LazySection";

// Only import components that are immediately needed
const Hero = lazy(() => import("../components/Hero"));

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showInterstitialAd, setShowInterstitialAd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Index component mounted");
    setIsLoading(false);
  }, []);

  // Show interstitial ad on certain navigations
  const handleSectionChange = (section: string) => {
    console.log("Section changing to:", section);
    if (Math.random() > 0.7) { // 30% chance for interstitial ad
      setShowInterstitialAd(true);
    }
    setActiveSection(section);
  };

  const renderSection = () => {
    console.log("Rendering section:", activeSection);
    
    try {
      switch (activeSection) {
        case "home":
          return (
            <>
              <Suspense fallback={<Loading variant="section" />}>
                <Hero />
              </Suspense>
              <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <LazySection componentName="WorkoutTemplates" />
                </div>
              </section>
              <LazySection componentName="WorkoutCategories" />
              <LazySection componentName="FeaturedExercises" />
              <LazySection componentName="TrainingSchedules" />
            </>
          );
        case "workouts":
          return (
            <>
              <LazySection componentName="WorkoutCategories" />
              <LazySection componentName="FeaturedExercises" />
              <LazySection componentName="TrainingSchedules" />
            </>
          );
        case "exercises":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="ExerciseLibrary" />
              </div>
            </section>
          );
        case "templates":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="WorkoutTemplates" />
              </div>
            </section>
          );
        case "programming":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="SmartProgramming" />
              </div>
            </section>
          );
        case "progress":
          return <LazySection componentName="ProgressDashboard" />;
        case "profile":
          return <LazySection componentName="UserProfile" />;
        case "nutrition":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="EnhancedNutritionTracker" />
              </div>
            </section>
          );
        case "community":
        case "social":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="SocialHub" />
              </div>
            </section>
          );
        case "gamification":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="GameDashboard" />
              </div>
            </section>
          );
        case "mobile":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="MobileFeatures" />
              </div>
            </section>
          );
        case "analytics":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="DetailedAnalytics" />
              </div>
            </section>
          );
        case "ai":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="AIDashboard" />
              </div>
            </section>
          );
        case "integrations":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="IntegrationHub" />
              </div>
            </section>
          );
        case "premium":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="PremiumFeatures" />
              </div>
            </section>
          );
        case "trainers":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="TrainerConnection" />
              </div>
            </section>
          );
        case "skills":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="SkillMastery" />
              </div>
            </section>
          );
        case "intelligence":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="SmartWorkoutIntelligence" />
              </div>
            </section>
          );
        case "permissions":
          return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="AppPermissions" />
              </div>
            </section>
          );
        default:
          return (
            <>
              <Suspense fallback={<Loading variant="section" />}>
                <Hero />
              </Suspense>
              <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <LazySection componentName="WorkoutTemplates" />
                </div>
              </section>
              <LazySection componentName="WorkoutCategories" />
              <LazySection componentName="FeaturedExercises" />
              <LazySection componentName="TrainingSchedules" />
            </>
          );
      }
    } catch (error) {
      console.error("Error rendering section:", error);
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading error. Please refresh the page.</div>
        </div>
      );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log("Rendering Index component");

  return (
    <div className="min-h-screen gradient-black-burgundy">
      <Navigation activeSection={activeSection} setActiveSection={handleSectionChange} />
      
      <main>
        <AdBanner position="top" size="banner" />
        {renderSection()}
        <AdBanner position="bottom" size="banner" />
      </main>
      
      <Footer />
      
      <InterstitialAd
        isOpen={showInterstitialAd}
        onClose={() => setShowInterstitialAd(false)}
      />
    </div>
  );
};

export default Index;
