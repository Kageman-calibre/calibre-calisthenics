
import WorkoutProgress from "./WorkoutProgress";

const ProgressDashboard = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Progress
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Track your journey and celebrate your achievements
          </p>
        </div>

        <WorkoutProgress />
      </div>
    </section>
  );
};

export default ProgressDashboard;
