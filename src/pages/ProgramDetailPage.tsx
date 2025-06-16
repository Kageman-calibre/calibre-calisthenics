
import ProgramDetail from "../components/ProgramDetail";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useState } from "react";

const ProgramDetailPage = () => {
  const [activeSection, setActiveSection] = useState("workouts");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <ProgramDetail />
      <Footer />
    </div>
  );
};

export default ProgramDetailPage;
