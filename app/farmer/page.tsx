'use client';

import { useState } from 'react';
import { DigitalReceipt } from '@/components/farming/DigitalReceipt';
import { QRCodeDisplay } from '@/components/farming/QRCodeDisplay';
import { DashboardStats } from '@/components/farming/DashboardStats';
import { MandiPrices } from '@/components/farming/MandiPrices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, TrendingUp, Calendar, MapPin, Bell } from 'lucide-react';
import type { CropEntry } from '@/lib/types';

// Extended mock data for demonstration
const mockReceipts: CropEntry[] = [
  {
    id: 'a7f3b2c9d8e5',
    cropType: 'wheat',
    weight: 1500,
    moisturePercentage: 13.5,
    mspRate: 3412500,
    timestamp: '2026-03-05T10:30:00Z',
    hash: '0x7f83b1a9c4e2d5f6a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1',
    merkleRoot: '0x9c4e2d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
    state: 'Punjab',
    district: 'Ludhiana',
    market: 'Ludhiana Mandi',
  },
  {
    id: 'b8e4c3d0f1a7',
    cropType: 'rice',
    weight: 2000,
    moisturePercentage: 14.2,
    mspRate: 4080000,
    timestamp: '2026-03-04T14:15:00Z',
    hash: '0x8c94a2b0d5e3f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3',
    merkleRoot: '0xa5e3f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3a4b5c6',
    state: 'Punjab',
    district: 'Amritsar',
    market: 'Amritsar Mandi',
  },
  {
    id: 'c9f5d4e1a2b8',
    cropType: 'maize',
    weight: 1200,
    moisturePercentage: 12.8,
    mspRate: 2352000,
    timestamp: '2026-03-03T09:45:00Z',
    hash: '0x9d05b3c1e6f4g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4',
    merkleRoot: '0xb6f4g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7',
    state: 'Haryana',
    district: 'Karnal',
    market: 'Karnal Mandi',
  },
  {
    id: 'd0a6e5f2b3c9',
    cropType: 'cotton',
    weight: 800,
    moisturePercentage: 11.5,
    mspRate: 5296000,
    timestamp: '2026-03-01T11:20:00Z',
    hash: '0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
    merkleRoot: '0xc7d8e9f0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8',
    state: 'Gujarat',
    district: 'Rajkot',
    market: 'Rajkot Mandi',
  },
  {
    id: 'e1b7f6a3c4d0',
    cropType: 'soyabean',
    weight: 950,
    moisturePercentage: 13.2,
    mspRate: 4085000,
    timestamp: '2026-02-28T16:45:00Z',
    hash: '0xb2c3d4e5f6g7h8i9j0k1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f2g3',
    merkleRoot: '0xd8e9f0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9',
    state: 'Madhya Pradesh',
    district: 'Indore',
    market: 'Indore Mandi',
  },
];

// Market price updates
const marketUpdates = [
  { crop: 'Wheat', price: '₹2,350', change: '+2.5%', trend: 'up' },
  { crop: 'Rice', price: '₹2,250', change: '+1.8%', trend: 'up' },
  { crop: 'Maize', price: '₹2,150', change: '+3.2%', trend: 'up' },
];

// Upcoming events
const upcomingEvents = [
  { date: 'Mar 10', title: 'MSP Payment Disbursement', type: 'payment' },
  { date: 'Mar 15', title: 'Kisan Sabha Meeting', type: 'meeting' },
  { date: 'Mar 20', title: 'New Crop Registration Opens', type: 'registration' },
];

export default function FarmerPage() {
  const [selectedReceipt, setSelectedReceipt] = useState<CropEntry | null>(null);
  const [showQR, setShowQR] = useState(false);

  const totalEarnings = mockReceipts.reduce((sum, r) => sum + r.mspRate, 0);
  const averageMSP = totalEarnings / mockReceipts.length;

  return (
    <div className="px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Farmer Dashboard</h1>
        <p className="text-forest-700">
          Welcome back! View your digital receipts and market updates
        </p>
      </div>

      <DashboardStats
        totalTransactions={mockReceipts.length}
        totalEarnings={totalEarnings}
        averageMSP={averageMSP}
      />

      {/* Live Mandi Prices Section */}
      <div className="mt-8">
        <MandiPrices />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mt-8">
        {/* Recent Receipts */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-emerald-800 mb-4">Recent Receipts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {mockReceipts.slice(0, 4).map((receipt) => (
              <DigitalReceipt
                key={receipt.id}
                receipt={receipt}
                onViewDetails={() => setSelectedReceipt(receipt)}
                onShowQR={() => {
                  setSelectedReceipt(receipt);
                  setShowQR(true);
                }}
              />
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Market Updates */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center gap-2 text-base">
                <TrendingUp className="h-5 w-5" />
                Market Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketUpdates.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-emerald-50 rounded">
                    <span className="font-medium text-emerald-900">{item.crop}</span>
                    <div className="text-right">
                      <p className="font-bold text-emerald-700">{item.price}</p>
                      <p className="text-xs text-green-600">{item.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center gap-2 text-base">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 bg-slate-50 rounded">
                    <div className="w-12 text-center">
                      <p className="text-xs text-slate-500">{event.date.split(' ')[0]}</p>
                      <p className="font-bold text-emerald-700">{event.date.split(' ')[1]}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{event.title}</p>
                      <span className="text-xs text-slate-500 capitalize">{event.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-emerald-800 mb-2">
                <Bell className="h-4 w-4" />
                <span className="font-medium text-sm">Did you know?</span>
              </div>
              <p className="text-xs text-emerald-700">
                You can verify your receipts anytime using the QR code. All transactions are permanently recorded on the blockchain.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedReceipt && !showQR && (
        <DigitalReceipt
          receipt={selectedReceipt}
          isExpanded
          onClose={() => setSelectedReceipt(null)}
        />
      )}

      {selectedReceipt && showQR && (
        <QRCodeDisplay
          receipt={selectedReceipt}
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  );
}
