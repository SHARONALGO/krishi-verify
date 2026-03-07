'use client';

import { QrCode, X, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CropEntry } from '@/lib/types';

interface QRCodeDisplayProps {
  receipt: CropEntry;
  onClose: () => void;
}

export function QRCodeDisplay({ receipt, onClose }: QRCodeDisplayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-emerald-800 flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Receipt QR Code
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* QR Code Placeholder */}
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-white border-2 border-emerald-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <QrCode className="h-32 w-32 text-emerald-600 mx-auto mb-4" />
                <p className="text-xs text-sage-600">QR Code Placeholder</p>
                <p className="text-xs text-emerald-700 font-mono mt-2">{receipt.id}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-sm text-forest-800 font-medium capitalize">{receipt.cropType}</p>
            <p className="text-2xl font-bold text-emerald-700">
              ₹{receipt.mspRate.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-sage-600">Scan to verify on blockchain</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
