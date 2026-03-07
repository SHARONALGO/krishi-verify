import { HeroSection } from '@/components/landing/HeroSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { FeaturesGrid } from '@/components/landing/FeatureCard';
import { WhyChooseSection } from '@/components/landing/WhyChooseSection';
import { ProgramsSchemesSection } from '@/components/landing/ProgramsSchemesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { NewsUpdatesSection } from '@/components/landing/NewsUpdatesSection';
import { CTASection, ContactSection } from '@/components/landing/CTASection';
import { TrustIndicators } from '@/components/landing/TrustIndicator';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <FeaturesGrid />
      <WhyChooseSection />
      <ProgramsSchemesSection />
      <HowItWorksSection />
      <ServicesSection />
      <TestimonialsSection />
      <NewsUpdatesSection />
      <CTASection />
      <ContactSection />
      <TrustIndicators />
    </div>
  );
}
