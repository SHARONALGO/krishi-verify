'use client';

import { CheckCircle, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { CropEntry } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/utils';

interface ReceiptGeneratorProps {
  receipt: CropEntry;
  onNewEntry: () => void;
}

export function ReceiptGenerator({ receipt, onNewEntry }: ReceiptGeneratorProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="mt-6 border-emerald-300 bg-emerald-50/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-emerald-800">
              <CheckCircle className="mr-2 h-5 w-5 text-emerald-600" />
              Receipt Generated Successfully
            </CardTitle>
            <CardDescription>
              Transaction has been hashed and recorded
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(receipt.hash)}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-sage-700">Receipt ID</p>
              <p className="font-mono text-sm text-emerald-800">{receipt.id}</p>
            </div>
            <div>
              <p className="text-xs text-sage-700">Crop Type</p>
              <p className="text-sm font-medium text-forest-800 capitalize">{receipt.cropType}</p>
            </div>
            <div>
              <p className="text-xs text-sage-700">Weight</p>
              <p className="text-sm font-medium text-forest-800">{receipt.weight} kg</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-sage-700">Moisture Content</p>
              <p className="text-sm font-medium text-forest-800">{receipt.moisturePercentage}%</p>
            </div>
            <div>
              <p className="text-xs text-sage-700">MSP Amount</p>
              <p className="text-lg font-bold text-emerald-700">{formatCurrency(receipt.mspRate)}</p>
            </div>
            <div>
              <p className="text-xs text-sage-700">Timestamp</p>
              <p className="text-sm text-forest-800">{formatDate(receipt.timestamp)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-emerald-200 bg-white p-4">
          <p className="text-xs text-sage-700 mb-2">Transaction Hash (SHA-256)</p>
          <code className="block text-xs font-mono text-emerald-800 break-all bg-emerald-50/50 p-2 rounded">
            {receipt.hash}
          </code>
        </div>

        <div className="mt-4 rounded-lg bg-sage-100 p-3">
          <p className="text-xs text-forest-700">
            <strong>Merkle Root:</strong> {receipt.merkleRoot.substring(0, 40)}...
          </p>
        </div>

        <div className="mt-6">
          <Button onClick={onNewEntry} variant="outline" className="w-full">
            Create New Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
