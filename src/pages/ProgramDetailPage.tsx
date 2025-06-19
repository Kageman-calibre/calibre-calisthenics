
import ProgramDetail from "../components/ProgramDetail";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const ProgramDetailPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navigation />
      <ProgramDetail />
      <Footer />
    </div>
  );
};

export default ProgramDetailPage;
