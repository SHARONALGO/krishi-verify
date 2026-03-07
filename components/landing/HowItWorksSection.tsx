'use client';

import { ArrowRight, Smartphone, FileText, TrendingUp, Check } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: Smartphone,
      step: '1',
      title: 'Register & Profile',
      description: 'Sign up with basic details. Verify through Aadhaar/phone for security.',
    },
    {
      icon: FileText,
      step: '2',
      title: 'Enter Produce Details',
      description: 'Input crop type, quantity, and quality. System calculates fair MSP price.',
    },
    {
      icon: TrendingUp,
      step: '3',
      title: 'Receive Instant Offer',
      description: 'Get real-time market rate offers from verified buyers and operators.',
    },
    {
      icon: Check,
      step: '4',
      title: 'Secure Payment',
      description: 'Digital receipt generated with QR code. Get paid directly to your bank account.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">How KRISHI-VERIFY Works</h2>
          <p className="text-forest-700 max-w-2xl mx-auto">
            Simple, transparent 4-step process designed for every farmer
          </p>
        </div>

        {/* Desktop View - Horizontal */}
        <div className="hidden md:grid gap-6 md:grid-cols-4 mb-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="mb-4 relative z-10">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-600 text-white font-bold text-xl">
                      {item.step}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-emerald-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-forest-700">{item.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute -right-3 top-8 text-emerald-300">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile View - Vertical */}
        <div className="md:hidden space-y-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-600 text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-emerald-900">{item.title}</h3>
                  <p className="text-sm text-forest-700 mt-1">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
