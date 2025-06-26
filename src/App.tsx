
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/auth/AuthProvider';
import Index from './pages/Index';
import Programs from './pages/Programs';
import ProgramDetailPage from './pages/ProgramDetailPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import RPGPage from './pages/RPGPage';
import WorkoutBuilderPage from './pages/WorkoutBuilderPage';
import VideoAnalyticsPage from './pages/VideoAnalyticsPage';
import SkillGuides from './pages/SkillGuides';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import BeginnerProgramsPage from './pages/BeginnerProgramsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/beginner-programs" element={<BeginnerProgramsPage />} />
            <Route path="/program-detail" element={<ProgramDetailPage />} />
            <Route path="/workout-detail" element={<WorkoutDetailPage />} />
            <Route path="/rpg" element={<RPGPage />} />
            <Route path="/workout-builder" element={<WorkoutBuilderPage />} />
            <Route path="/video-analytics" element={<VideoAnalyticsPage />} />
            <Route path="/skill-guides" element={<SkillGuides />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
