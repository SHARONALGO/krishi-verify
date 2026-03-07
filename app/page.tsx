import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesGrid } from '@/components/landing/FeatureCard';
import { TrustIndicators } from '@/components/landing/TrustIndicator';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesGrid />
      <TrustIndicators />
    </div>
  );
}
