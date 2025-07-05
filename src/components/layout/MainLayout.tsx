
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
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      
      <Navigation />
      
      <main className="relative z-10 min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <AdBanner position="top" size="banner" />
          <div>
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
