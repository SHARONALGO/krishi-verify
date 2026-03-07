'use client';

import { Sprout, Weight, Droplets, Calculator, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface CropEntryFormProps {
  cropType: string;
  weight: string;
  moisture: string;
  onCropTypeChange: (value: string) => void;
  onWeightChange: (value: string) => void;
  onMoistureChange: (value: string) => void;
  onCalculate: () => void;
  isCalculating: boolean;
}

export function CropEntryForm({
  cropType,
  weight,
  moisture,
  onCropTypeChange,
  onWeightChange,
  onMoistureChange,
  onCalculate,
  isCalculating,
}: CropEntryFormProps) {
  const cropOptions = [
    'Wheat', 'Rice', 'Maize', 'Bajra', 'Jowar', 'Ragi', 'Cotton', 'Soyabean', 'Groundnut', 'Mustard'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <Sprout className="mr-2 h-5 w-5" />
          Crop Entry Details
        </CardTitle>
        <CardDescription>
          Enter the crop information for procurement
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-forest-700">Crop Type</label>
          <select
            value={cropType}
            onChange={(e) => onCropTypeChange(e.target.value)}
            className="flex h-10 w-full rounded-md border border-emerald-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <option value="">Select crop...</option>
            {cropOptions.map((crop) => (
              <option key={crop} value={crop.toLowerCase()}>{crop}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-forest-700">Weight (kg)</label>
          <div className="relative">
            <Input
              type="number"
              placeholder="Enter weight in kg"
              value={weight}
              onChange={(e) => onWeightChange(e.target.value)}
              className="pl-10"
            />
            <Weight className="absolute left-3 top-3 h-4 w-4 text-sage-500" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-forest-700">Moisture Percentage (%)</label>
          <div className="relative">
            <Input
              type="number"
              step="0.1"
              placeholder="Enter moisture %"
              value={moisture}
              onChange={(e) => onMoistureChange(e.target.value)}
              className="pl-10"
            />
            <Droplets className="absolute left-3 top-3 h-4 w-4 text-sage-500" />
          </div>
          <p className="text-xs text-sage-600">Optimal: 12-14% for most crops</p>
        </div>

        <Button 
          onClick={onCalculate} 
          disabled={!cropType || !weight || !moisture || isCalculating}
          className="w-full"
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Auto-MSP
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
