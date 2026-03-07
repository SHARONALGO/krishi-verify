'use client';

import { Sprout, DollarSign, Package, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProgramsSchemesSection() {
  const programs = [
    {
      icon: DollarSign,
      title: 'MSP Guarantee Program',
      description: 'Guaranteed minimum support prices with transparent calculations and blockchain verification.',
      features: ['Real-time pricing', 'Direct payments', 'No middlemen'],
    },
    {
      icon: Sprout,
      title: 'Crop Diversification',
      description: 'Support for farmers transitioning to high-value crops with subsidies and training.',
      features: ['Expert guidance', 'Seed subsidy', 'Market linkage'],
    },
    {
      icon: Package,
      title: 'Digital Certification',
      description: 'QR-coded digital receipts for produce with authenticity verification.',
      features: ['QR tracking', 'Digital records', 'Fair trade assured'],
    },
    {
      icon: BarChart3,
      title: 'Market Intelligence',
      description: 'Real-time market data, price trends, and demand forecasting for better decisions.',
      features: ['Price trends', 'Demand forecast', 'Export data'],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Government Programs & Schemes</h2>
          <p className="text-forest-700 max-w-2xl mx-auto">
            Comprehensive support programs designed for modern farming with transparent benefits
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div key={index} className="group p-6 rounded-lg border border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all">
                <div className="mb-4">
                  <div className="inline-block p-3 rounded-lg bg-emerald-100 group-hover:bg-emerald-600 transition-colors">
                    <Icon className="h-6 w-6 text-emerald-700 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <h3 className="font-bold text-emerald-900 mb-2">{program.title}</h3>
                <p className="text-sm text-forest-700 mb-4">{program.description}</p>
                <ul className="space-y-1">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-forest-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Explore All Government Schemes
          </Button>
        </div>
      </div>
    </section>
  );
}
