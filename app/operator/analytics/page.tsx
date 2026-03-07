'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, TrendingUp, BarChart3, DollarSign, ShoppingCart, Users, Activity } from 'lucide-react';

// Sample data for analytics
const marketData = [
  { month: 'Jan', msp: 2275, market: 2150, volume: 12500 },
  { month: 'Feb', msp: 2275, market: 2200, volume: 13200 },
  { month: 'Mar', msp: 2275, market: 2250, volume: 14800 },
  { month: 'Apr', msp: 2275, market: 2300, volume: 15600 },
  { month: 'May', msp: 2275, market: 2280, volume: 14300 },
  { month: 'Jun', msp: 2275, market: 2350, volume: 16800 },
];

const cropPrices = [
  { crop: 'Wheat', msp: 2275, market: 2350, change: '+3.3%', trend: 'up' },
  { crop: 'Rice', msp: 2183, market: 2250, change: '+3.1%', trend: 'up' },
  { crop: 'Maize', msp: 2090, market: 2150, change: '+2.9%', trend: 'up' },
  { crop: 'Cotton', msp: 6620, market: 6850, change: '+3.5%', trend: 'up' },
  { crop: 'Soyabean', msp: 4300, market: 4450, change: '+3.5%', trend: 'up' },
];

const recentTransactions = [
  { id: 'TXN-2024-001', farmer: 'Rajesh Kumar', crop: 'Wheat', quantity: '50 Qtl', amount: '₹1,17,500', date: '2024-01-15' },
  { id: 'TXN-2024-002', farmer: 'Suresh Patel', crop: 'Rice', quantity: '75 Qtl', amount: '₹1,68,750', date: '2024-01-14' },
  { id: 'TXN-2024-003', farmer: 'Amit Singh', crop: 'Maize', quantity: '40 Qtl', amount: '₹86,000', date: '2024-01-14' },
  { id: 'TXN-2024-004', farmer: 'Priya Sharma', crop: 'Cotton', quantity: '25 Qtl', amount: '₹1,71,250', date: '2024-01-13' },
];

export default function MandiAnalyticsPage() {
  const router = useRouter();
  const { role, loading } = useUser();

  useEffect(() => {
    if (!loading && role === 'farmer') {
      router.push('/farmer');
    }
  }, [role, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          Mandi Analytics
        </h1>
        <p className="text-slate-600">
          Real-time market insights and procurement analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-blue-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Procurement</p>
                <p className="text-2xl font-bold text-blue-900">₹2.4Cr</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Volume</p>
                <p className="text-2xl font-bold text-blue-900">87,200 Qtl</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Active Farmers</p>
                <p className="text-2xl font-bold text-blue-900">1,247</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Market Variance</p>
                <p className="text-2xl font-bold text-blue-900">+3.2%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Price Comparison Chart */}
        <Card className="border-blue-200 bg-white">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              MSP vs Market Price Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.map((data, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="w-12 text-sm text-slate-600">{data.month}</span>
                  <div className="flex-1 h-8 bg-slate-100 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                      style={{ width: `${(data.market / 2500) * 100}%` }}
                    />
                    <div 
                      className="absolute left-0 top-0 h-full bg-blue-300 rounded-full opacity-70"
                      style={{ width: `${(data.msp / 2500) * 100}%` }}
                    />
                  </div>
                  <span className="w-16 text-sm font-medium text-blue-700">₹{data.market}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded" />
                <span className="text-sm text-slate-600">Market Price</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-300 rounded" />
                <span className="text-sm text-slate-600">MSP</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Price Table */}
        <Card className="border-blue-200 bg-white">
          <CardHeader>
            <CardTitle className="text-blue-800">Current Crop Prices (₹/Quintal)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cropPrices.map((crop, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">{crop.crop}</p>
                    <p className="text-xs text-slate-500">MSP: ₹{crop.msp}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-700">₹{crop.market}</p>
                    <p className="text-xs text-green-600">{crop.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-blue-200 bg-white mt-6">
        <CardHeader>
          <CardTitle className="text-blue-800">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Farmer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Crop</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((txn, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm font-mono text-blue-600">{txn.id}</td>
                    <td className="py-3 px-4 text-sm text-slate-800">{txn.farmer}</td>
                    <td className="py-3 px-4 text-sm text-slate-800">{txn.crop}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{txn.quantity}</td>
                    <td className="py-3 px-4 text-sm font-medium text-blue-700">{txn.amount}</td>
                    <td className="py-3 px-4 text-sm text-slate-500">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}