'use client';

import { useState } from 'react';
import { Shield, TrendingUp, DollarSign, Receipt } from 'lucide-react';
import { DigitalReceipt } from '@/components/farming/DigitalReceipt';
import { QRCodeDisplay } from '@/components/farming/QRCodeDisplay';
import { DashboardStats } from '@/components/farming/DashboardStats';
import type { CropEntry } from '@/lib/types';

// Mock data for demonstration
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
  },
];

export default function FarmerPage() {
  const [selectedReceipt, setSelectedReceipt] = useState<CropEntry | null>(null);
  const [showQR, setShowQR] = useState(false);

  const totalEarnings = mockReceipts.reduce((sum, r) => sum + r.mspRate, 0);
  const averageMSP = totalEarnings / mockReceipts.length;

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Farmer Dashboard</h1>
        <p className="text-forest-700">
          View your digital receipts and verify transactions
        </p>
      </div>

      <DashboardStats
        totalTransactions={mockReceipts.length}
        totalEarnings={totalEarnings}
        averageMSP={averageMSP}
      />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">Recent Receipts</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockReceipts.map((receipt) => (
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
