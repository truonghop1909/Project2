// app/(public)/page.tsx

import { CTASection } from "./components/sections/CTASection";
import { FeaturedBuildings } from "./components/sections/FeaturedBuildings";
import { HeroSection } from "./components/sections/HeroSection";
import { StatsSection } from "./components/sections/StatsSection";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedBuildings />
      <StatsSection />
      <CTASection />
    </>
  );
}