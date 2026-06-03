import { HeroSection } from '@/sections/HeroSection';
import { StatsPreview } from '@/sections/StatsPreview';
import { FeaturedBuildings } from '@/sections/FeaturedBuildings';
import { TopBuildingsSection } from '@/sections/TopBuildingsSection';
import { BuildingsByCitySection } from '@/sections/BuildingsByCitySection';
import { TopStaffSection } from '@/sections/TopStaffSection';
import { Testimonials } from '@/sections/Testimonials';
import { Newsletter } from '@/sections/Newsletter';
import { CTASection } from '@/sections/CTASection';
import { AnimatedSection } from '@/components/ui/AnimatedSection'; // tạo file này nếu chưa có

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnimatedSection><StatsPreview /></AnimatedSection>
      <AnimatedSection><FeaturedBuildings /></AnimatedSection>
      <AnimatedSection><TopBuildingsSection /></AnimatedSection>
      <AnimatedSection><BuildingsByCitySection /></AnimatedSection>
      <AnimatedSection><TopStaffSection /></AnimatedSection>
      <AnimatedSection><Testimonials /></AnimatedSection>
      <AnimatedSection><Newsletter /></AnimatedSection>
      <AnimatedSection><CTASection /></AnimatedSection>
    </>
  );
}