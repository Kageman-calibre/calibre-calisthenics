
interface ExerciseProgressProps {
  exercises: Array<{
    id: string;
    name: string;
    sets: number;
  }>;
  completedSets: number[];
  currentExercise: number;
  currentSet: number;
}

const ExerciseProgress = ({ 
  exercises, 
  completedSets, 
  currentExercise, 
  currentSet 
}: ExerciseProgressProps) => {
  const isSetCompleted = (exerciseIndex: number, setNumber: number) => {
    const setKey = exerciseIndex * 10 + setNumber;
    return completedSets.includes(setKey);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30">
      <h3 className="text-lg font-semibold text-white mb-4">Exercise Progress</h3>
      
      <div className="space-y-4">
        {exercises.map((exercise, exerciseIndex) => (
          <div key={exercise.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${
                exerciseIndex === currentExercise ? 'text-orange-400' : 'text-gray-400'
              }`}>
                {exercise.name}
              </span>
              <span className="text-xs text-gray-500">
                {exercise.sets} sets
              </span>
            </div>
            <div className="flex space-x-2">
              {[...Array(exercise.sets)].map((_, setIndex) => (
                <div
                  key={setIndex}
                  className={`flex-1 h-2 rounded-full ${
                    isSetCompleted(exerciseIndex, setIndex + 1)
                      ? 'bg-green-500'
                      : exerciseIndex === currentExercise && setIndex + 1 === currentSet
                      ? 'bg-orange-500'
                      : 'bg-slate-600'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseProgress;
