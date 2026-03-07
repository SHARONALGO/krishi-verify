'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppWindow, Users, TrendingUp, Smartphone } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: AppWindow,
      title: 'Digital Marketplace',
      description: 'Real-time buying and selling platform connecting farmers directly with buyers, eliminating middlemen.',
      features: ['Live auctions', 'Direct buyer connection', 'Price comparison'],
    },
    {
      icon: TrendingUp,
      title: 'Price Intelligence',
      description: 'AI-powered analytics providing market trends, price predictions, and demand forecasting.',
      features: ['Price trends', 'Market analysis', 'Demand forecast'],
    },
    {
      icon: Smartphone,
      title: 'Mobile First Platform',
      description: 'Fully responsive app designed for farmers with local language support and offline access.',
      features: ['Local languages', 'Offline mode', 'Easy interface'],
    },
    {
      icon: Users,
      title: 'Farmer Support Network',
      description: '24/7 customer support, training, and expert agricultural advice available to all users.',
      features: ['24/7 helpline', 'Expert advice', 'Training sessions'],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Our Services</h2>
          <p className="text-forest-700 max-w-2xl mx-auto">
            Comprehensive solutions designed to empower farmers with technology and transparency
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="rounded-lg border border-emerald-200 p-8 hover:border-emerald-400 hover:shadow-lg transition-all">
                <div className="mb-6">
                  <div className="inline-block p-3 rounded-lg bg-emerald-100">
                    <Icon className="h-8 w-8 text-emerald-700" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-2">{service.title}</h3>
                <p className="text-forest-700 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-forest-700">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/services">
                  <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    Learn More
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
