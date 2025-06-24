
import { useState } from "react";
import TrainingSchedules from "../components/TrainingSchedules";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Programs = () => {
  const [activeSection, setActiveSection] = useState("programs");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      <TrainingSchedules />
      <Footer />
    </div>
  );
};

export default Programs;
