
import { useState, useEffect, useCallback } from "react";
import MainLayout from "../components/layout/MainLayout";
import SectionRenderer from "../components/layout/SectionRenderer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showInterstitialAd, setShowInterstitialAd] = useState(false);

  useEffect(() => {
    console.log("Index component mounted");
  }, []);

  // Memoize handlers to prevent unnecessary re-renders
  const handleSectionChange = useCallback((section: string) => {
    console.log("Section changing to:", section);
    if (Math.random() > 0.7) {
      setShowInterstitialAd(true);
    }
    setActiveSection(section);
  }, []);

  const handleInterstitialClose = useCallback(() => {
    setShowInterstitialAd(false);
  }, []);

  console.log("Rendering Index component");

  return (
    <MainLayout
      showInterstitialAd={showInterstitialAd}
      onInterstitialClose={handleInterstitialClose}
    >
      <SectionRenderer activeSection={activeSection} />
    </MainLayout>
  );
};

export default Index;
