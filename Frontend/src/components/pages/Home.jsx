import React from "react";

import HeroSection from "./HeroSection";
import VideoGuide from "./VideoGuide";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";

function Home() {
  return (
    <div>
      <HeroSection />
      <VideoGuide />
      <ServicesSection />
    <AboutSection />
    </div>
  );
}

export default Home;
