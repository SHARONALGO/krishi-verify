'use client';

import { useState } from 'react';
import { TransparencyMetrics } from '@/components/public/TransparencyMetrics';
import { ProcurementTable } from '@/components/public/ProcurementTable';
import { VerifyButton } from '@/components/public/VerifyButton';
import { Search, TrendingUp, MapPin, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicPage() {
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const states = ['All States', 'Punjab', 'Haryana', 'Madhya Pradesh', 'Rajasthan', 'Uttar Pradesh', 'Karnataka', 'Bihar'];
  const crops = ['All Crops', 'Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Corn', 'Vegetables', 'Fruits'];
  const periods = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year'];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Public Transparency Dashboard</h1>
          <p className="text-lg text-emerald-100">
            Real-time agricultural procurement data, verified transactions, and market transparency
          </p>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-8 md:py-12">
        {/* Stats Overview */}
        <TransparencyMetrics />

        {/* Filters Section */}
        <section className="my-12">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">Filter Data</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Crop Type</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {crops.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-2">Time Period</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {periods.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                <Search className="inline h-4 w-4 mr-2" />
                Search Data
              </button>
            </div>
          </div>
        </section>

        {/* Market Insights */}
        <section className="my-12">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">Market Insights</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { title: 'Average MSP', value: '₹2,200', change: '+5.2%', icon: TrendingUp },
              { title: 'Top Crop', value: 'Wheat', desc: '45% of transactions' },
              { title: 'Active Traders', value: '8,245', change: '+12%' },
              { title: 'Today\'s Volume', value: '₹45.2 Cr', desc: '+23% from yesterday' },
            ].map((metric, idx) => (
              <div key={idx} className="rounded-lg border border-emerald-200 p-6 hover:shadow-md transition-shadow">
                <p className="text-sm text-forest-700 mb-2">{metric.title}</p>
                <p className="text-2xl font-bold text-emerald-900">{metric.value}</p>
                {metric.change && <p className="text-sm text-green-600 mt-2">{metric.change}</p>}
                {metric.desc && <p className="text-xs text-forest-600 mt-2">{metric.desc}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="my-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-emerald-900">Latest Transactions</h2>
                <Button variant="outline" className="border-emerald-600 text-emerald-600">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
              <ProcurementTable />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-emerald-900 mb-4">Verify Transaction</h3>
                <VerifyButton />
              </div>

              {/* Quick Stats */}
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-6">
                <h3 className="font-bold text-emerald-900 mb-4">Quick Facts</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    <span className="text-forest-700">Platform uptime: <strong>99.8%</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    <span className="text-forest-700">Verified transactions: <strong>124,567</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    <span className="text-forest-700">Active traders: <strong>8,245</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    <span className="text-forest-700">Average settlement: <strong>24 hours</strong></span>
                  </li>
                </ul>
              </div>

              {/* Information Box */}
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-6">
                <h3 className="font-bold text-blue-900 mb-2">About This Dashboard</h3>
                <p className="text-sm text-blue-800">
                  This public dashboard displays anonymized transaction data to ensure transparency while protecting personal information. 
                  All data is verified and blockchain-certified.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* District-wise Statistics */}
        <section className="my-12">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">District Performance</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { district: 'Ludhiana', state: 'Punjab', txns: '2,456', volume: '₹12.3 Cr' },
              { district: 'Hisar', state: 'Haryana', txns: '1,890', volume: '₹9.8 Cr' },
              { district: 'Indore', state: 'MP', txns: '1,654', volume: '₹8.6 Cr' },
              { district: 'Jaipur', state: 'Rajasthan', txns: '1,432', volume: '₹7.2 Cr' },
            ].map((district, idx) => (
              <div key={idx} className="rounded-lg border border-emerald-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-emerald-900">{district.district}</p>
                    <p className="text-xs text-forest-600 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {district.state}
                    </p>
                  </div>
                </div>
                <div className="border-t border-emerald-100 pt-3">
                  <p className="text-xs text-forest-700 mb-1">Transactions: <strong>{district.txns}</strong></p>
                  <p className="text-xs text-forest-700">Volume: <strong>{district.volume}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
