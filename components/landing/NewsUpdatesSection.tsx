'use client';

import { FileText, Bell, AlertCircle, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function NewsUpdatesSection() {
  const updates = [
    {
      date: 'Mar 7, 2025',
      title: 'MSP Paddy Seeds Subsidy Program Launched',
      description: 'New subsidy scheme for DSR paddy seeds covering 10 states',
      category: 'Scheme',
      icon: FileText,
      color: 'emerald',
    },
    {
      date: 'Mar 5, 2025',
      title: 'System Maintenance Alert: Platform Upgrade',
      description: 'Scheduled 2-hour maintenance for platform enhancement. No service disruption expected.',
      category: 'Alert',
      icon: AlertCircle,
      color: 'amber',
    },
    {
      date: 'Mar 3, 2025',
      title: 'Digital Receipt Format Updated',
      description: 'Enhanced receipt format with QR code integration for better verification',
      category: 'Update',
      icon: Download,
      color: 'blue',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-2">Latest Updates</h2>
              <p className="text-forest-700">Stay informed with platform news and important announcements</p>
            </div>
            <a href="#news" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm hidden md:block">
              View All →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {updates.map((update, index) => {
              const Icon = update.icon;
              const colorClasses = {
                emerald: 'bg-emerald-100 border-emerald-200 text-emerald-700',
                blue: 'bg-blue-100 border-blue-200 text-blue-700',
                amber: 'bg-amber-100 border-amber-200 text-amber-700',
              };

              return (
                <Card key={index} className={`cursor-pointer hover:shadow-lg transition-shadow border-2 ${colorClasses[update.color as keyof typeof colorClasses]}`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/60">
                        {update.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{update.date}</p>
                    <h3 className="font-semibold text-emerald-900 mb-2 line-clamp-2">{update.title}</h3>
                    <p className="text-sm text-forest-700 line-clamp-2">{update.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
