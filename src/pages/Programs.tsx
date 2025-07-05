
import { useState } from "react";
import TrainingSchedules from "../components/TrainingSchedules";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Programs = () => {
  const [activeSection, setActiveSection] = useState("programs");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <TrainingSchedules />
      <Footer />
    </div>
  );
};

export default Programs;
