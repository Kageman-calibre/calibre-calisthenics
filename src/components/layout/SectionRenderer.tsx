
import { Suspense, lazy } from "react";
import { Loading } from "../ui/loading";
import LazySection from "../LazySection";
import ErrorBoundary from "../ui/error-boundary";

// Only import Hero immediately since it's above the fold
const Hero = lazy(() => import("../Hero"));

interface SectionRendererProps {
  activeSection: string;
}

const SectionRenderer = ({ activeSection }: SectionRendererProps) => {
  console.log("Rendering section:", activeSection);
  
  switch (activeSection) {
    case "home":
      return (
        <div className="min-h-screen">
          <ErrorBoundary>
            <Suspense fallback={<Loading variant="section" />}>
              <Hero />
            </Suspense>
          </ErrorBoundary>
          
          {/* Main content grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              <div className="space-y-16">
                <LazySection componentName="WorkoutCategories" />
                <LazySection componentName="TrainingSchedules" />
              </div>
              <div className="space-y-16">
                <LazySection componentName="FeaturedExercises" />
              </div>
            </div>
          </div>
        </div>
      );
    case "workouts":
      return (
        <div className="pt-16 sm:pt-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <LazySection componentName="WorkoutCategories" />
              <LazySection componentName="FeaturedExercises" />
            </div>
            <div className="mt-16">
              <LazySection componentName="TrainingSchedules" />
            </div>
          </div>
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
        <div className="min-h-screen">
          <ErrorBoundary>
            <Suspense fallback={<Loading variant="section" />}>
              <Hero />
            </Suspense>
          </ErrorBoundary>
          
          {/* Main content grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              <div className="space-y-16">
                <LazySection componentName="WorkoutCategories" />
                <LazySection componentName="TrainingSchedules" />
              </div>
              <div className="space-y-16">
                <LazySection componentName="FeaturedExercises" />
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default SectionRenderer;
