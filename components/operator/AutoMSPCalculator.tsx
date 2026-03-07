'use client';

import { TrendingUp, FilePlus, RefreshCcw, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface AutoMSPCalculatorProps {
  // New Location Props to match OperatorPage state
  state: string;
  district: string;
  market: string;
  
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
  state,
  district,
  market,
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
    <Card className="border-emerald-100">
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <TrendingUp className="mr-2 h-5 w-5" />
          Auto-MSP Calculator
        </CardTitle>
        <CardDescription>
          Verified regional calculation for {market || 'selected mandi'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Location Summary Badge */}
        <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-md border border-emerald-100 text-emerald-700 text-xs">
          <MapPin className="h-3 w-3" />
          <span className="font-medium">
            {state ? `${state} > ${district} > ${market}` : 'Location not set'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-100">
            <p className="text-xs text-sage-700 mb-1">Crop Variety</p>
            <p className="text-lg font-semibold text-emerald-800 capitalize">
              {cropType || '-'}
            </p>
          </div>
          <div className="rounded-lg bg-sage-50 p-4 border border-sage-100">
            <p className="text-xs text-sage-700 mb-1">Net Weight</p>
            <p className="text-lg font-semibold text-forest-800">
              {weight ? `${weight} kg` : '-'}
            </p>
          </div>
        </div>

        {calculatedMSP !== null && (
          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-sage-700">Final MSP Payout</span>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-4xl font-bold text-emerald-700">
              {formatCurrency(calculatedMSP)}
            </div>
            <div className="mt-3 pt-3 border-t border-emerald-200/50">
              <p className="text-[10px] text-sage-600 leading-tight">
                * Based on local modal prices and FAQ moisture adjustments
              </p>
            </div>
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
              <p className="text-center text-sm font-medium text-emerald-700 animate-pulse">
                Securing Audit Trail... {Math.round(miningProgress)}%
              </p>
            </div>
          ) : (
            <>
              <Button 
                onClick={onGenerateReceipt}
                disabled={!calculatedMSP || !market}
                className="w-full bg-emerald-700 hover:bg-emerald-800 shadow-md"
                size="lg"
              >
                <FilePlus className="mr-2 h-5 w-5" />
                Generate Digital Receipt
              </Button>
              <Button 
                onClick={onReset}
                variant="outline"
                className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Clear and New Entry
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}