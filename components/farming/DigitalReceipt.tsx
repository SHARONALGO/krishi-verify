'use client';

import { Receipt, QrCode, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CropEntry } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/utils';

interface DigitalReceiptProps {
  receipt: CropEntry;
  onViewDetails?: () => void;
  onShowQR?: () => void;
  isExpanded?: boolean;
  onClose?: () => void;
}

export function DigitalReceipt({
  receipt,
  onViewDetails,
  onShowQR,
  isExpanded = false,
  onClose,
}: DigitalReceiptProps) {
  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-emerald-800">Receipt Details</CardTitle>
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-sage-700">Receipt ID</p>
                <p className="font-mono text-sm text-emerald-800">{receipt.id}</p>
              </div>
              <div>
                <p className="text-sm text-sage-700">Date</p>
                <p className="text-sm text-forest-800">{formatDate(receipt.timestamp)}</p>
              </div>
              <div>
                <p className="text-sm text-sage-700">Crop Type</p>
                <p className="text-sm font-medium capitalize">{receipt.cropType}</p>
              </div>
              <div>
                <p className="text-sm text-sage-700">Weight</p>
                <p className="text-sm font-medium">{receipt.weight} kg</p>
              </div>
              <div>
                <p className="text-sm text-sage-700">Moisture</p>
                <p className="text-sm font-medium">{receipt.moisturePercentage}%</p>
              </div>
              <div>
                <p className="text-sm text-sage-700">MSP Amount</p>
                <p className="text-lg font-bold text-emerald-700">{formatCurrency(receipt.mspRate)}</p>
              </div>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
              <p className="text-xs text-sage-700 mb-2">Transaction Hash</p>
              <code className="block text-xs font-mono text-emerald-800 break-all">
                {receipt.hash}
              </code>
            </div>

            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Verified on Blockchain</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="glass-card hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewDetails}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-emerald-600" />
              <span className="font-mono text-sm text-emerald-800">{receipt.id}</span>
            </div>
            <p className="text-lg font-semibold text-forest-800 capitalize">{receipt.cropType}</p>
            <p className="text-sm text-sage-700">{receipt.weight} kg • {receipt.moisturePercentage}% moisture</p>
            <p className="text-xl font-bold text-emerald-700">{formatCurrency(receipt.mspRate)}</p>
            <p className="text-xs text-sage-600">{formatDate(receipt.timestamp)}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onShowQR?.();
            }}
          >
            <QrCode className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
