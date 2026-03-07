'use client';

import { TrendingUp, DollarSign, Receipt } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface DashboardStatsProps {
  totalTransactions: number;
  totalEarnings: number;
  averageMSP: number;
}

export function DashboardStats({
  totalTransactions,
  totalEarnings,
  averageMSP,
}: DashboardStatsProps) {
  const stats = [
    {
      icon: Receipt,
      label: 'Total Transactions',
      value: totalTransactions.toString(),
      color: 'emerald',
    },
    {
      icon: DollarSign,
      label: 'Total Earnings',
      value: formatCurrency(totalEarnings),
      color: 'emerald',
    },
    {
      icon: TrendingUp,
      label: 'Average MSP',
      value: formatCurrency(averageMSP),
      color: 'emerald',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-emerald-100 p-3">
                  <Icon className="h-6 w-6 text-emerald-700" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-sage-700">{stat.label}</p>
                  <p className="text-2xl font-bold text-emerald-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
