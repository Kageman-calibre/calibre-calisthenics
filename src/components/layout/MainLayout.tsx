
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
    <div className="min-h-screen gradient-black-burgundy">
      <Navigation />
      
      <main className="relative">
        <AdBanner position="top" size="banner" />
        {children}
        <AdBanner position="bottom" size="banner" />
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
