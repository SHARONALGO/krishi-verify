'use client';

import { TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  trend?: string;
}

function MetricCard({ icon: Icon, label, value, subtext, trend }: MetricCardProps) {
  return (
    <Card className="glass-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="rounded-lg bg-emerald-100 p-3">
            <Icon className="h-6 w-6 text-emerald-700" />
          </div>
          {trend && (
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              {trend}
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm text-sage-700">{label}</p>
          <p className="text-2xl font-bold text-emerald-800">{value}</p>
          <p className="text-xs text-sage-600 mt-1">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function TransparencyMetrics() {
  const metrics = [
    {
      icon: TrendingUp,
      label: 'Total Procurement',
      value: '₹15.2 Cr',
      subtext: 'This month',
      trend: '+12.5%',
    },
    {
      icon: Users,
      label: 'Active Operators',
      value: '156',
      subtext: 'Across 23 districts',
    },
    {
      icon: CheckCircle,
      label: 'Verified Transactions',
      value: '12,847',
      subtext: '100% on blockchain',
    },
    {
      icon: Clock,
      label: 'Avg. Turnaround',
      value: '4.2 hrs',
      subtext: 'From entry to payment',
      trend: '-15%',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </div>
  );
}
