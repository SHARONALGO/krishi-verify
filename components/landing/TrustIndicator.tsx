'use client';

import { CheckCircle, Shield, Lock } from 'lucide-react';

export function TrustIndicators() {
  const stats = [
    { label: 'Transactions Secured', value: '10,000+' },
    { label: 'Active Operators', value: '500+' },
    { label: 'Registered Farmers', value: '25,000+' },
    { label: 'Uptime', value: '99.9%' },
  ];

  return (
    <section className="py-16 bg-emerald-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">
            Trusted by Agricultural Communities
          </h2>
          <p className="text-forest-700">
            High-trust platform ensuring transparency across the supply chain.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-sage-700">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2 justify-center">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <span className="text-sm text-forest-700">Verified Transactions</span>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <Shield className="h-5 w-5 text-emerald-600" />
            <span className="text-sm text-forest-700">Data Protection</span>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <Lock className="h-5 w-5 text-emerald-600" />
            <span className="text-sm text-forest-700">Cryptographic Security</span>
          </div>
        </div>
      </div>
    </section>
  );
}
