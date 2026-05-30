import { HeroSection } from './components/sections/HeroSection';
import { FeaturedBuildings } from './components/sections/FeaturedBuildings';
import { StatsSection } from './components/sections/StatsSection';
import { CTASection } from './components/sections/CTASection';

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