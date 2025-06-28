
import ExerciseCard from "../ExerciseCard";
import EnhancedWorkoutTimer from "../timer/EnhancedWorkoutTimer";
import WorkoutControls from "../WorkoutControls";
import ExerciseProgress from "../ExerciseProgress";
import WorkoutNavigation from "../WorkoutNavigation";

interface WorkoutDetailContentProps {
  currentEx: any;
  currentExercise: number;
  currentSet: number;
  exercises: any[];
  completedSets: number[];
  isResting: boolean;
  getRestTime: (exerciseIndex: number) => number;
  handleTimerComplete: () => void;
  handleCompleteSet: () => void;
  handleFinishWorkout: () => void;
  handlePreviousExercise: () => void;
  handleNextExercise: () => void;
}

const WorkoutDetailContent = ({
  currentEx,
  currentExercise,
  currentSet,
  exercises,
  completedSets,
  isResting,
  getRestTime,
  handleTimerComplete,
  handleCompleteSet,
  handleFinishWorkout,
  handlePreviousExercise,
  handleNextExercise
}: WorkoutDetailContentProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div>
        <ExerciseCard 
          exercise={currentEx} 
          showDetails={true}
        />
        
        <WorkoutNavigation
          currentExercise={currentExercise}
          totalExercises={exercises.length}
          onPrevious={handlePreviousExercise}
          onNext={handleNextExercise}
        />
      </div>

      <div className="space-y-8">
        {isResting ? (
          <EnhancedWorkoutTimer
            initialTime={getRestTime(currentExercise)}
            onComplete={handleTimerComplete}
            autoStart={true}
            title="Rest Time"
          />
        ) : (
          <WorkoutControls
            currentSet={currentSet}
            totalSets={currentEx.sets}
            reps={currentEx.reps}
            restTime={currentEx.restTime}
            onCompleteSet={handleCompleteSet}
            onFinishWorkout={handleFinishWorkout}
          />
        )}

        <ExerciseProgress
          exercises={exercises}
          completedSets={completedSets}
          currentExercise={currentExercise}
          currentSet={currentSet}
        />
      </div>
    </div>
  );
};

export default WorkoutDetailContent;
