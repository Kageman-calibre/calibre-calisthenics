
import { useState } from "react";
import BeginnerPrograms from "../components/BeginnerPrograms";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const BeginnerProgramsPage = () => {
  const [activeSection, setActiveSection] = useState("programs");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      <BeginnerPrograms />
      <Footer />
    </div>
  );
};

export default BeginnerProgramsPage;
