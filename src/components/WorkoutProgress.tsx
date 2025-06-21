
import WorkoutStats from './progress/WorkoutStats';
import PeriodProgress from './progress/PeriodProgress';
import RecentWorkouts from './progress/RecentWorkouts';
import { useWorkoutData } from './progress/useWorkoutData';

const WorkoutProgress = () => {
  const { workoutHistory, userStats, loading } = useWorkoutData();

  if (loading) {
    return <div className="text-white">Loading your progress...</div>;
  }

  return (
    <div className="space-y-8">
      <WorkoutStats userStats={userStats} />
      <PeriodProgress workoutHistory={workoutHistory} />
      <RecentWorkouts workoutHistory={workoutHistory} />
    </div>
  );
};

export default WorkoutProgress;

// Export the hook for other components to use
export { useWorkoutData as useWorkoutProgress };
