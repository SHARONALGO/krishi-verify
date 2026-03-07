'use client';

import { Leaf, Shield, Database, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="glass-card hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
          <Icon className="h-6 w-6 text-emerald-700" />
        </div>
        <CardTitle className="text-xl text-emerald-800">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export function FeaturesGrid() {
  const features = [
    {
      icon: Leaf,
      title: 'Organic & Secure',
      description: 'Green-centric design meets enterprise-grade security for your agricultural data.',
    },
    {
      icon: Shield,
      title: 'Farmer-Owned Data',
      description: 'Complete ownership and control over your procurement records and transactions.',
    },
    {
      icon: Database,
      title: 'Immutable Records',
      description: 'Every transaction is hashed and stored with cryptographic verification.',
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Live procurement trends and instant receipt generation with MSP calculations.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">
            Why Choose KRISHI-VERIFY?
          </h2>
          <p className="text-forest-700 max-w-[600px] mx-auto">
            Built for transparency, designed for trust, powered by cutting-edge technology.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
