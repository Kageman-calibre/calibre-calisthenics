
import { useWorkoutDetail } from "../hooks/useWorkoutDetail";
import WorkoutDetailHeader from "./workout/WorkoutDetailHeader";
import WorkoutDetailContent from "./workout/WorkoutDetailContent";
import WorkoutDetailModals from "./workout/WorkoutDetailModals";

const WorkoutDetail = () => {
  const {
    currentExercise,
    currentSet,
    isResting,
    completedSets,
    showPreparation,
    showAdjustments,
    showFinishConfirmation,
    workoutStarted,
    exercises,
    currentEx,
    exercisesForAdjustment,
    handleWorkoutStart,
    handleAdjustExercises,
    handleSaveAdjustments,
    handleCancelPreparation,
    handleCancelAdjustments,
    handleFinishWorkout,
    handleFinishConfirmed,
    handleFinishCancelled,
    handleCompleteSet,
    handleTimerComplete,
    handlePreviousExercise,
    handleNextExercise,
    getWorkoutDuration,
    getCompletedExercisesCount,
    getRestTime
  } = useWorkoutDetail();

  if (!currentEx) {
    return <div className="text-white">Loading...</div>;
  }

  if (!workoutStarted) {
    return (
      <WorkoutDetailModals
        showPreparation={showPreparation}
        showAdjustments={showAdjustments}
        showFinishConfirmation={false}
        exercisesForAdjustment={exercisesForAdjustment}
        getCompletedExercisesCount={getCompletedExercisesCount}
        totalExercises={exercises.length}
        getWorkoutDuration={getWorkoutDuration}
        handleWorkoutStart={handleWorkoutStart}
        handleAdjustExercises={handleAdjustExercises}
        handleCancelPreparation={handleCancelPreparation}
        handleSaveAdjustments={handleSaveAdjustments}
        handleCancelAdjustments={handleCancelAdjustments}
        handleFinishConfirmed={handleFinishConfirmed}
        handleFinishCancelled={handleFinishCancelled}
      />
    );
  }

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <WorkoutDetailHeader
            currentExercise={currentExercise}
            totalExercises={exercises.length}
            currentSet={currentSet}
            totalSets={currentEx.sets}
          />

          <WorkoutDetailContent
            currentEx={currentEx}
            currentExercise={currentExercise}
            currentSet={currentSet}
            exercises={exercises}
            completedSets={completedSets}
            isResting={isResting}
            getRestTime={getRestTime}
            handleTimerComplete={handleTimerComplete}
            handleCompleteSet={handleCompleteSet}
            handleFinishWorkout={handleFinishWorkout}
            handlePreviousExercise={handlePreviousExercise}
            handleNextExercise={handleNextExercise}
          />
        </div>
      </section>

      <WorkoutDetailModals
        showPreparation={false}
        showAdjustments={false}
        showFinishConfirmation={showFinishConfirmation}
        exercisesForAdjustment={exercisesForAdjustment}
        getCompletedExercisesCount={getCompletedExercisesCount}
        totalExercises={exercises.length}
        getWorkoutDuration={getWorkoutDuration}
        handleWorkoutStart={handleWorkoutStart}
        handleAdjustExercises={handleAdjustExercises}
        handleCancelPreparation={handleCancelPreparation}
        handleSaveAdjustments={handleSaveAdjustments}
        handleCancelAdjustments={handleCancelAdjustments}
        handleFinishConfirmed={handleFinishConfirmed}
        handleFinishCancelled={handleFinishCancelled}
      />
    </>
  );
};

export default WorkoutDetail;
