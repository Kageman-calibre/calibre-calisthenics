
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

export default SectionRenderer;
