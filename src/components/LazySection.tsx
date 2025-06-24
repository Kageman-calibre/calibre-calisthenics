
import { Suspense, lazy, memo } from 'react';
import { Loading } from '@/components/ui/loading';
import ErrorBoundary from '@/components/ui/error-boundary';

interface LazySectionProps {
  componentName: string;
  fallback?: React.ReactNode;
}

const LazySection = memo(({ componentName, fallback }: LazySectionProps) => {
  const Component = lazy(() => {
    switch (componentName) {
      case 'WorkoutCategories':
        return import('./WorkoutCategories');
      case 'FeaturedExercises':
        return import('./FeaturedExercises');
      case 'TrainingSchedules':
        return import('./TrainingSchedules');
      case 'ProgressDashboard':
        return import('./ProgressDashboard');
      case 'UserProfile':
        return import('./UserProfile');
      case 'EnhancedNutritionTracker':
        return import('./nutrition/EnhancedNutritionTracker');
      case 'SocialHub':
        return import('./social/SocialHub');
      case 'GameDashboard':
        return import('./gamification/GameDashboard');
      case 'MobileFeatures':
        return import('./MobileFeatures');
      case 'DetailedAnalytics':
        return import('./analytics/DetailedAnalytics');
      case 'AIDashboard':
        return import('./ai/AIDashboard');
      case 'IntegrationHub':
        return import('./integrations/IntegrationHub');
      case 'PremiumFeatures':
        return import('./premium/PremiumFeatures');
      case 'TrainerConnection':
        return import('./social/TrainerConnection');
      case 'WorkoutTemplates':
        return import('./templates/WorkoutTemplates');
      case 'ExerciseLibrary':
        return import('./exercise/ExerciseLibrary');
      case 'SmartProgramming':
        return import('./programming/SmartProgramming');
      case 'SmartWorkoutIntelligence':
        return import('./intelligence/SmartWorkoutIntelligence');
      case 'SkillMastery':
        return import('./skills/SkillMastery');
      case 'AppPermissions':
        return import('./mobile/AppPermissions');
      default:
        throw new Error(`Component ${componentName} not found`);
    }
  });

  return (
    <ErrorBoundary>
      <Suspense fallback={fallback || <Loading variant="section" />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
});

LazySection.displayName = 'LazySection';

export default LazySection;
