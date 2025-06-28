
import { ReactNode } from "react";
import Navigation from "../Navigation";
import Footer from "../Footer";
import AdBanner from "../ads/AdBanner";
import InterstitialAd from "../ads/InterstitialAd";

interface MainLayoutProps {
  children: ReactNode;
  showInterstitialAd: boolean;
  onInterstitialClose: () => void;
}

const MainLayout = ({ children, showInterstitialAd, onInterstitialClose }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Background blur elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <Navigation />
      
      <main className="relative z-10 min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <AdBanner position="top" size="banner" />
          <div className="backdrop-blur-sm">
            {children}
          </div>
          <AdBanner position="bottom" size="banner" />
        </div>
      </main>
      
      <Footer />
      
      <InterstitialAd
        isOpen={showInterstitialAd}
        onClose={onInterstitialClose}
      />
    </div>
  );
};

export default MainLayout;
