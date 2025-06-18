
import { useState } from 'react';
import { Users, Star, MessageCircle, Video, Calendar, Award, MapPin, Clock } from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  specialty: string[];
  rating: number;
  reviews: number;
  experience: string;
  location: string;
  avatar: string;
  hourlyRate: number;
  available: boolean;
  bio: string;
  certifications: string[];
}

interface Session {
  id: string;
  trainerId: string;
  date: string;
  time: string;
  type: 'video' | 'in-person' | 'phone';
  status: 'upcoming' | 'completed' | 'cancelled';
}

const TrainerConnection = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      trainerId: 'trainer1',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'video',
      status: 'upcoming'
    }
  ]);

  const trainers: Trainer[] = [
    {
      id: 'trainer1',
      name: 'Sarah Johnson',
      specialty: ['Strength Training', 'Weight Loss', 'HIIT'],
      rating: 4.9,
      reviews: 247,
      experience: '8 years',
      location: 'New York, NY',
      avatar: '👩‍💼',
      hourlyRate: 75,
      available: true,
      bio: 'Certified personal trainer specializing in strength training and weight loss. Helped over 500 clients achieve their fitness goals.',
      certifications: ['NASM-CPT', 'ACSM', 'Nutrition Specialist']
    },
    {
      id: 'trainer2',
      name: 'Mike Rodriguez',
      specialty: ['Bodybuilding', 'Powerlifting', 'Sports Performance'],
      rating: 4.8,
      reviews: 189,
      experience: '12 years',
      location: 'Los Angeles, CA',
      avatar: '👨‍💼',
      hourlyRate: 90,
      available: true,
      bio: 'Former competitive bodybuilder with expertise in muscle building and sports performance optimization.',
      certifications: ['NSCA-CSCS', 'ISSA', 'Sports Nutrition']
    },
    {
      id: 'trainer3',
      name: 'Emily Chen',
      specialty: ['Yoga', 'Flexibility', 'Mindfulness'],
      rating: 4.9,
      reviews: 156,
      experience: '6 years',
      location: 'San Francisco, CA',
      avatar: '🧘‍♀️',
      hourlyRate: 65,
      available: false,
      bio: 'Holistic wellness coach combining yoga, meditation, and movement therapy for complete mind-body wellness.',
      certifications: ['RYT-500', 'Meditation Teacher', 'Movement Therapy']
    }
  ];

  const bookSession = (trainerId: string) => {
    const newSession: Session = {
      id: Date.now().toString(),
      trainerId,
      date: '2024-01-25',
      time: '2:00 PM',
      type: 'video',
      status: 'upcoming'
    };
    setSessions(prev => [...prev, newSession]);
    setSelectedTrainer(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Personal Trainers</h2>
        <p className="text-xl text-gray-300">Connect with certified trainers for personalized guidance</p>
      </div>

      {/* Upcoming Sessions */}
      {sessions.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Calendar className="h-5 w-5 text-green-500 mr-2" />
            Upcoming Sessions
          </h3>
          <div className="space-y-3">
            {sessions.filter(s => s.status === 'upcoming').map((session) => {
              const trainer = trainers.find(t => t.id === session.trainerId);
              return (
                <div key={session.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{trainer?.avatar}</div>
                    <div>
                      <p className="text-white font-medium">{trainer?.name}</p>
                      <p className="text-gray-400 text-sm">{session.date} at {session.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs capitalize">
                      {session.type}
                    </span>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                      Join Session
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Trainer Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 transition-all duration-300 hover:border-slate-600/50"
          >
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">{trainer.avatar}</div>
              <h4 className="text-xl font-bold text-white">{trainer.name}</h4>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(trainer.rating)}
                <span className="text-gray-400 text-sm ml-2">
                  {trainer.rating} ({trainer.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {trainer.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {trainer.experience}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-3">{trainer.bio}</p>
              
              <div className="mb-3">
                <p className="text-white font-medium text-sm mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {trainer.specialty.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <p className="text-white font-medium text-sm mb-2">Certifications:</p>
                <div className="flex flex-wrap gap-1">
                  {trainer.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-bold text-lg">${trainer.hourlyRate}/hour</span>
                <div className={`flex items-center space-x-1 ${trainer.available ? 'text-green-400' : 'text-red-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${trainer.available ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-xs">{trainer.available ? 'Available' : 'Busy'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => bookSession(trainer.id)}
                disabled={!trainer.available}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  trainer.available
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {trainer.available ? 'Book Session' : 'Currently Unavailable'}
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center">
                  <Users className="h-4 w-4 mr-1" />
                  Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Success Stories */}
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-lg rounded-2xl p-8 border border-slate-600/30">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Award className="h-6 w-6 text-yellow-500 mr-3" />
          Success Stories
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <p className="text-gray-300 mb-3 italic">
              "Sarah helped me lose 30 pounds and gain incredible strength. Her personalized approach made all the difference!"
            </p>
            <div className="flex items-center space-x-2">
              <div className="text-2xl">👤</div>
              <div>
                <p className="text-white font-medium">Jessica M.</p>
                <div className="flex">{renderStars(5)}</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <p className="text-gray-300 mb-3 italic">
              "Mike's powerlifting expertise took my deadlift from 225 to 405 in just 6 months. Amazing results!"
            </p>
            <div className="flex items-center space-x-2">
              <div className="text-2xl">👤</div>
              <div>
                <p className="text-white font-medium">David L.</p>
                <div className="flex">{renderStars(5)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerConnection;
