<<<<<<< Updated upstream
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
=======
'use client';

import { Sprout, Weight, Droplets, Calculator, Loader2, MapPin, Building2, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface CropEntryFormProps {
  // New Location Props
  state: string;
  district: string;
  market: string;
  onStateChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onMarketChange: (value: string) => void;
  
  // Existing Crop Props
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
  state,
  district,
  market,
  onStateChange,
  onDistrictChange,
  onMarketChange,
  cropType,
  weight,
  moisture,
  onCropTypeChange,
  onWeightChange,
  onMoistureChange,
  onCalculate,
  isCalculating,
}: CropEntryFormProps) {
  
  // These options can later be populated dynamically from your CSV
  const cropOptions = [
    'Wheat', 'Rice', 'Maize', 'Bajra', 'Jowar', 'Ragi', 'Cotton', 'Soyabean', 'Groundnut', 'Mustard'
  ];

  return (
    <Card className="border-emerald-100 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <Sprout className="mr-2 h-5 w-5" />
          Procurement Details
        </CardTitle>
        <CardDescription>
          Enter the location and crop data for verified entry
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* --- Location Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-emerald-700">State</label>
            <div className="relative">
              <Input
                placeholder="e.g. Punjab"
                value={state}
                onChange={(e) => onStateChange(e.target.value)}
                className="pl-9 h-9 border-emerald-200"
              />
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-emerald-700">District</label>
            <div className="relative">
              <Input
                placeholder="e.g. Ludhiana"
                value={district}
                onChange={(e) => onDistrictChange(e.target.value)}
                className="pl-9 h-9 border-emerald-200"
              />
              <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600" />
            </div>
          </div>

          <div className="col-span-full space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Mandi / Market Name</label>
            <div className="relative">
              <Input
                placeholder="Enter Mandi name"
                value={market}
                onChange={(e) => onMarketChange(e.target.value)}
                className="pl-9 h-9 border-emerald-200"
              />
              <Landmark className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* --- Crop Data Section --- */}
        <div className="space-y-4 pt-2">
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
                placeholder="Enter total weight"
                value={weight}
                onChange={(e) => onWeightChange(e.target.value)}
                className="pl-10 border-emerald-200"
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
                className="pl-10 border-emerald-200"
              />
              <Droplets className="absolute left-3 top-3 h-4 w-4 text-sage-500" />
            </div>
            <p className="text-[10px] text-sage-600 italic">Target: 12-14% for maximum payout</p>
          </div>
        </div>

        <Button 
          onClick={onCalculate} 
          disabled={!state || !market || !cropType || !weight || !moisture || isCalculating}
          className="w-full bg-emerald-700 hover:bg-emerald-800 transition-colors"
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying Regional Rates...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Regional MSP
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
>>>>>>> Stashed changes
