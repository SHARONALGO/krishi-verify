'use client';

import { CheckCircle2, Lock, Zap, Users, BarChart3, Award } from 'lucide-react';

export function WhyChooseSection() {
  const reasons = [
    {
      icon: CheckCircle2,
      title: 'Complete Transparency',
      description: 'Every transaction is documented, verified, and accessible to farmers anytime.',
    },
    {
      icon: Lock,
      title: 'Bank-Level Security',
      description: 'SHA-256 encryption ensures your data and transactions are completely secure.',
    },
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Direct bank transfers with zero middlemen delays. Get paid in 24 hours.',
    },
    {
      icon: Users,
      title: 'Farmer-First Design',
      description: 'Built specifically for farmers with simple interfaces and support in local languages.',
    },
    {
      icon: BarChart3,
      title: 'Market Data Access',
      description: 'Real-time price trends, historical data, and predictive analytics for better decisions.',
    },
    {
      icon: Award,
      title: 'Government Verified',
      description: 'Registered with government agriculture departments across multiple states.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Why KRISHI-VERIFY?</h2>
          <p className="text-forest-700 max-w-2xl mx-auto">
            We are committed to transforming agricultural commerce with technology, trust, and transparency
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-900">{reason.title}</h3>
                  <p className="mt-2 text-forest-700">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
