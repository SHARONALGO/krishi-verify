'use client';

import { Users, Briefcase, TrendingUp, MapPin } from 'lucide-react';

export function StatsSection() {
  const stats = [
    { icon: Users, value: '45,000+', label: 'Farmers Registered', color: 'emerald' },
    { icon: Briefcase, value: '₹2,45,000 Cr', label: 'Total Transactions', color: 'blue' },
    { icon: TrendingUp, value: '99.8%', label: 'Uptime Record', color: 'green' },
    { icon: MapPin, value: '23+', label: 'States Covered', color: 'amber' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-emerald-100">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">
            The KRISHI-VERIFY Impact
          </h2>
          <p className="text-forest-700 max-w-2xl mx-auto">
            Supporting agricultural transparency across India with secure, blockchain-verified transactions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              emerald: 'bg-emerald-100 text-emerald-700',
              blue: 'bg-blue-100 text-blue-700',
              green: 'bg-green-100 text-green-700',
              amber: 'bg-amber-100 text-amber-700',
            };
            
            return (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className={`inline-flex p-3 rounded-full mb-4 ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-emerald-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-forest-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
