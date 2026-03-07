'use client';

import { TrendingUp, FilePlus, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface AutoMSPCalculatorProps {
  cropType: string;
  weight: string;
  moisture: string;
  calculatedMSP: number | null;
  onGenerateReceipt: () => void;
  onReset: () => void;
  isGenerating: boolean;
  miningProgress: number;
}

export function AutoMSPCalculator({
  cropType,
  weight,
  moisture,
  calculatedMSP,
  onGenerateReceipt,
  onReset,
  isGenerating,
  miningProgress,
}: AutoMSPCalculatorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <TrendingUp className="mr-2 h-5 w-5" />
          Auto-MSP Calculator
        </CardTitle>
        <CardDescription>
          Real-time MSP calculation with moisture adjustment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-emerald-50 p-4">
            <p className="text-xs text-sage-700 mb-1">Crop</p>
            <p className="text-lg font-semibold text-emerald-800 capitalize">
              {cropType || '-'}
            </p>
          </div>
          <div className="rounded-lg bg-sage-50 p-4">
            <p className="text-xs text-sage-700 mb-1">Weight</p>
            <p className="text-lg font-semibold text-forest-800">
              {weight ? `${weight} kg` : '-'}
            </p>
          </div>
        </div>

        {calculatedMSP !== null && (
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-sage-700">Calculated MSP Amount</span>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-emerald-700">
              {formatCurrency(calculatedMSP)}
            </div>
            <p className="text-xs text-sage-600 mt-2">
              Includes moisture adjustment factor
            </p>
          </div>
        )}

        <div className="space-y-3">
          {isGenerating ? (
            <div className="space-y-2">
              <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${miningProgress}%` }}
                />
              </div>
              <p className="text-center text-sm text-emerald-700">
                Generating hash... {Math.round(miningProgress)}%
              </p>
            </div>
          ) : (
            <>
              <Button 
                onClick={onGenerateReceipt}
                disabled={!calculatedMSP}
                className="w-full"
                size="lg"
              >
                <FilePlus className="mr-2 h-5 w-5" />
                Generate Receipt
              </Button>
              <Button 
                onClick={onReset}
                variant="outline"
                className="w-full"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
