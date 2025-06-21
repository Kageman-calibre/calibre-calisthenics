import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/auth/AuthProvider";
import AuthPage from "./components/auth/AuthPage";
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import WorkoutDetailPage from "./pages/WorkoutDetailPage";
import WorkoutBuilderPage from "./pages/WorkoutBuilderPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/program/:id" element={<ProgramDetailPage />} />
      <Route path="/workout/:id" element={<WorkoutDetailPage />} />
      <Route path="/studio" element={<WorkoutBuilderPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <AppRoutes />
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
