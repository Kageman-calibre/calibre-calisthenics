
import { useState, useEffect, Suspense, lazy, useCallback, memo } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AdBanner from "../components/ads/AdBanner";
import InterstitialAd from "../components/ads/InterstitialAd";
import { Loading } from "../components/ui/loading";
import LazySection from "../components/LazySection";
import ErrorBoundary from "../components/ui/error-boundary";

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

  // Memoize the section change handler to prevent unnecessary re-renders
  const handleSectionChange = useCallback((section: string) => {
    console.log("Section changing to:", section);
    if (Math.random() > 0.7) { // 30% chance for interstitial ad
      setShowInterstitialAd(true);
    }
    setActiveSection(section);
  }, []);

  // Memoize the interstitial ad close handler
  const handleInterstitialClose = useCallback(() => {
    setShowInterstitialAd(false);
  }, []);

  // Memoized section renderer to prevent unnecessary re-renders
  const MemoizedSectionRenderer = memo(() => {
    console.log("Rendering section:", activeSection);
    
    try {
      switch (activeSection) {
        case "home":
          return (
            <>
              <ErrorBoundary>
                <Suspense fallback={<Loading variant="section" />}>
                  <Hero />
                </Suspense>
              </ErrorBoundary>
              <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
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
            <div className="pt-16 sm:pt-18">
              <LazySection componentName="WorkoutCategories" />
              <LazySection componentName="FeaturedExercises" />
              <LazySection componentName="TrainingSchedules" />
            </div>
          );
        case "exercises":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="ExerciseLibrary" />
              </div>
            </section>
          );
        case "templates":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="WorkoutTemplates" />
              </div>
            </section>
          );
        case "programming":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="SmartProgramming" />
              </div>
            </section>
          );
        case "progress":
          return (
            <div className="pt-16 sm:pt-18">
              <LazySection componentName="ProgressDashboard" />
            </div>
          );
        case "profile":
          return (
            <div className="pt-16 sm:pt-18">
              <LazySection componentName="UserProfile" />
            </div>
          );
        case "nutrition":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="EnhancedNutritionTracker" />
              </div>
            </section>
          );
        case "community":
        case "social":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="SocialHub" />
              </div>
            </section>
          );
        case "gamification":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="GameDashboard" />
              </div>
            </section>
          );
        case "mobile":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="MobileFeatures" />
              </div>
            </section>
          );
        case "analytics":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="DetailedAnalytics" />
              </div>
            </section>
          );
        case "ai":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="AIDashboard" />
              </div>
            </section>
          );
        case "integrations":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="IntegrationHub" />
              </div>
            </section>
          );
        case "premium":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="PremiumFeatures" />
              </div>
            </section>
          );
        case "trainers":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="TrainerConnection" />
              </div>
            </section>
          );
        case "skills":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="SkillMastery" />
              </div>
            </section>
          );
        case "intelligence":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="SmartWorkoutIntelligence" />
              </div>
            </section>
          );
        case "permissions":
          return (
            <section className="pt-16 sm:pt-18 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <LazySection componentName="AppPermissions" />
              </div>
            </section>
          );
        default:
          return (
            <>
              <ErrorBoundary>
                <Suspense fallback={<Loading variant="section" />}>
                  <Hero />
                </Suspense>
              </ErrorBoundary>
              <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
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
        <ErrorBoundary>
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-white text-lg sm:text-xl text-center">Loading error. Please refresh the page.</div>
          </div>
        </ErrorBoundary>
      );
    }
  });

  MemoizedSectionRenderer.displayName = 'MemoizedSectionRenderer';

  if (isLoading) {
    return <Loading />;
  }

  console.log("Rendering Index component");

  return (
    <div className="min-h-screen gradient-black-burgundy">
      <Navigation activeSection={activeSection} setActiveSection={handleSectionChange} />
      
      <main className="relative">
        <AdBanner position="top" size="banner" />
        <MemoizedSectionRenderer />
        <AdBanner position="bottom" size="banner" />
      </main>
      
      <Footer />
      
      <InterstitialAd
        isOpen={showInterstitialAd}
        onClose={handleInterstitialClose}
      />
    </div>
  );
};

export default Index;
