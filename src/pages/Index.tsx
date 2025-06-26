
import { useState, useEffect, Suspense, lazy, useCallback, memo } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AdBanner from "../components/ads/AdBanner";
import InterstitialAd from "../components/ads/InterstitialAd";
import { Loading } from "../components/ui/loading";
import LazySection from "../components/LazySection";
import ErrorBoundary from "../components/ui/error-boundary";

// Only import Hero immediately since it's above the fold
const Hero = lazy(() => import("../components/Hero"));

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showInterstitialAd, setShowInterstitialAd] = useState(false);

  useEffect(() => {
    console.log("Index component mounted");
  }, []);

  // Memoize handlers to prevent unnecessary re-renders
  const handleSectionChange = useCallback((section: string) => {
    console.log("Section changing to:", section);
    if (Math.random() > 0.7) {
      setShowInterstitialAd(true);
    }
    setActiveSection(section);
  }, []);

  const handleInterstitialClose = useCallback(() => {
    setShowInterstitialAd(false);
  }, []);

  // Simplified section renderer for better performance
  const renderSection = () => {
    console.log("Rendering section:", activeSection);
    
    switch (activeSection) {
      case "home":
        return (
          <>
            <ErrorBoundary>
              <Suspense fallback={<Loading variant="section" />}>
                <Hero />
              </Suspense>
            </ErrorBoundary>
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
      default:
        return (
          <>
            <ErrorBoundary>
              <Suspense fallback={<Loading variant="section" />}>
                <Hero />
              </Suspense>
            </ErrorBoundary>
            <LazySection componentName="WorkoutCategories" />
            <LazySection componentName="FeaturedExercises" />
            <LazySection componentName="TrainingSchedules" />
          </>
        );
    }
  };

  console.log("Rendering Index component");

  return (
    <div className="min-h-screen gradient-black-burgundy">
      <Navigation />
      
      <main className="relative">
        <AdBanner position="top" size="banner" />
        {renderSection()}
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
