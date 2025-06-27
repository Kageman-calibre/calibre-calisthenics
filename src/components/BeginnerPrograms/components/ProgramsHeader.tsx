
interface ProgramsHeaderProps {}

const ProgramsHeader = ({}: ProgramsHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
        <span className="text-emerald-400 text-sm font-medium">Beginner Friendly</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        Start Your
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400">
          Fitness Journey
        </span>
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Carefully designed programs that grow with you. Each workout earns XP and unlocks achievements in your fitness RPG journey.
      </p>
    </div>
  );
};

export default ProgramsHeader;
