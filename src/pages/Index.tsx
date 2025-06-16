
import { useState } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import WorkoutCategories from "../components/WorkoutCategories";
import FeaturedExercises from "../components/FeaturedExercises";
import ProgressDashboard from "../components/ProgressDashboard";
import TrainingSchedules from "../components/TrainingSchedules";
import Footer from "../components/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {activeSection === "home" && (
        <>
          <Hero />
          <WorkoutCategories />
          <FeaturedExercises />
        </>
      )}
      
      {activeSection === "workouts" && <TrainingSchedules />}
      {activeSection === "progress" && <ProgressDashboard />}
      
      <Footer />
    </div>
  );
};

export default Index;
