
import { useState, useEffect } from 'react';
import { User, Target, Calendar, Trophy, Settings } from 'lucide-react';

interface UserData {
  name: string;
  age: number;
  weight: number;
  height: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferredWorkoutDays: string[];
  joinDate: string;
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    age: 28,
    weight: 75,
    height: 180,
    fitnessLevel: 'intermediate',
    goals: ['Build muscle', 'Increase strength'],
    preferredWorkoutDays: ['Monday', 'Wednesday', 'Friday'],
    joinDate: new Date().toISOString()
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const saveUserData = (newData: UserData) => {
    setUserData(newData);
    localStorage.setItem('userData', JSON.stringify(newData));
    setIsEditing(false);
  };

  const calculateBMI = () => {
    const heightInMeters = userData.height / 100;
    return (userData.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getMembershipDuration = () => {
    const joinDate = new Date(userData.joinDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isEditing) {
    return <UserProfileEdit userData={userData} onSave={saveUserData} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Profile
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Track your fitness journey and personal goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-8 border border-slate-600/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{userData.name}</h3>
                  <p className="text-gray-400 capitalize">{userData.fitnessLevel} Level</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-300"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">{userData.age}</div>
                <div className="text-sm text-gray-400">Years Old</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{userData.weight}kg</div>
                <div className="text-sm text-gray-400">Weight</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{userData.height}cm</div>
                <div className="text-sm text-gray-400">Height</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{calculateBMI()}</div>
                <div className="text-sm text-gray-400">BMI</div>
              </div>
            </div>

            {/* Goals */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Target className="h-5 w-5 text-orange-500 mr-2" />
                Fitness Goals
              </h4>
              <div className="flex flex-wrap gap-2">
                {userData.goals.map((goal, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>

            {/* Workout Schedule */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                Preferred Workout Days
              </h4>
              <div className="flex flex-wrap gap-2">
                {userData.preferredWorkoutDays.map((day, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Membership Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                Membership
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Member since</span>
                  <span className="text-white">{new Date(userData.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Days active</span>
                  <span className="text-white">{getMembershipDuration()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-medium">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-6 border border-slate-600/30">
              <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300">
                  Start Workout
                </button>
                <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300">
                  View Progress
                </button>
                <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300">
                  Browse Programs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Separate component for editing profile
const UserProfileEdit = ({ 
  userData, 
  onSave, 
  onCancel 
}: { 
  userData: UserData; 
  onSave: (data: UserData) => void; 
  onCancel: () => void; 
}) => {
  const [formData, setFormData] = useState(userData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-8 border border-slate-600/30 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value)})}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({...formData, height: parseInt(e.target.value)})}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Fitness Level</label>
            <select
              value={formData.fitnessLevel}
              onChange={(e) => setFormData({...formData, fitnessLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced'})}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
