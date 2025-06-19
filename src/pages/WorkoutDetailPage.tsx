
import WorkoutDetail from "../components/WorkoutDetail";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const WorkoutDetailPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      <WorkoutDetail />
      <Footer />
    </div>
  );
};

export default WorkoutDetailPage;
