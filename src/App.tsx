
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import SecureErrorBoundary from "./components/ui/secure-error-boundary";
import { setSecurityHeaders, setCSRFToken } from "./utils/securityHeaders";
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import WorkoutDetailPage from "./pages/WorkoutDetailPage";
import BeginnerProgramsPage from "./pages/BeginnerProgramsPage";
import WorkoutBuilderPage from "./pages/WorkoutBuilderPage";
import SkillGuides from "./pages/SkillGuides";
import RPGPage from "./pages/RPGPage";
import VideoAnalyticsPage from "./pages/VideoAnalyticsPage";
import AuthPage from "./components/auth/AuthPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on authentication errors
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status === 401 || status === 403) {
            return false;
          }
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  useEffect(() => {
    // Set security headers and CSRF token on app initialization
    setSecurityHeaders();
    setCSRFToken();
    
    // Log app initialization (in production, send to secure logging service)
    console.log('App initialized:', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  }, []);

  return (
    <SecureErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:id" element={<ProgramDetailPage />} />
                <Route path="/workout/:id" element={<WorkoutDetailPage />} />
                <Route path="/beginner-programs" element={<BeginnerProgramsPage />} />
                <Route path="/studio" element={<WorkoutBuilderPage />} />
                <Route path="/skill-guides" element={<SkillGuides />} />
                <Route path="/rpg" element={<RPGPage />} />
                <Route path="/video-analytics" element={<VideoAnalyticsPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </SecureErrorBoundary>
  );
};

export default App;
