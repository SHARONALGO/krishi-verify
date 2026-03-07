'use client';

import { useState } from 'react';
import { Calculator, Sprout, Weight, Droplets, TrendingUp, RefreshCcw, MapPin, Building2, Landmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { calculateMSP, formatCurrency } from '@/lib/utils';

export default function FarmerCalculatorPage() {
  // Location States
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [market, setMarket] = useState('');
  
  // Crop States
  const [cropType, setCropType] = useState('');
  const [weight, setWeight] = useState('');
  const [moisture, setMoisture] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const cropOptions = [
    'Wheat', 'Rice', 'Maize', 'Bajra', 'Jowar', 'Ragi', 'Cotton', 'Soyabean', 'Groundnut', 'Mustard'
  ];

  const handleCalculate = async () => {
    if (!state || !market || !cropType || !weight || !moisture) return;
    
    setIsCalculating(true);
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const price = calculateMSP(cropType, parseFloat(weight), parseFloat(moisture));
    setEstimatedPrice(price);
    setIsCalculating(false);
  };

  const handleReset = () => {
    setState('');
    setDistrict('');
    setMarket('');
    setCropType('');
    setWeight('');
    setMoisture('');
    setEstimatedPrice(null);
  };

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">MSP What-If Calculator</h1>
        <p className="text-forest-700">Estimate your expected fair price before visiting the mandi</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Input Form */}
        <Card className="border-emerald-100 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-800">
              <Sprout className="mr-2 h-5 w-5" />
              Crop Details
            </CardTitle>
            <CardDescription>
              Enter your location and crop data for price estimation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Location Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-emerald-700">State</label>
                <div className="relative">
                  <Input
                    placeholder="e.g. Punjab"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
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
                    onChange={(e) => setDistrict(e.target.value)}
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
                    onChange={(e) => setMarket(e.target.value)}
                    className="pl-9 h-9 border-emerald-200"
                  />
                  <Landmark className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Crop Data Section */}
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-700">Crop Type</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
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
                    placeholder="Enter expected weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
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
                    onChange={(e) => setMoisture(e.target.value)}
                    className="pl-10 border-emerald-200"
                  />
                  <Droplets className="absolute left-3 top-3 h-4 w-4 text-sage-500" />
                </div>
                <p className="text-[10px] text-sage-600 italic">Target: 12-14% for maximum payout</p>
              </div>
            </div>

            <Button 
              onClick={handleCalculate} 
              disabled={!state || !market || !cropType || !weight || !moisture || isCalculating}
              className="w-full bg-emerald-700 hover:bg-emerald-800 transition-colors"
            >
              {isCalculating ? (
                <>
                  <TrendingUp className="mr-2 h-4 w-4 animate-pulse" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Estimated MSP
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Right Column - Results */}
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-800">
              <TrendingUp className="mr-2 h-5 w-5" />
              What-If Results
            </CardTitle>
            <CardDescription>
              Estimated payout for {market || 'selected mandi'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Location Summary Badge */}
            <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-md border border-emerald-100 text-emerald-700 text-xs">
              <MapPin className="h-3 w-3" />
              <span className="font-medium">
                {state ? `${state} > ${district || '-'} > ${market}` : 'Location not set'}
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

            {estimatedPrice !== null ? (
              <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-sage-700">Estimated MSP Payout</span>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-4xl font-bold text-emerald-700">
                  {formatCurrency(estimatedPrice)}
                </div>
                <div className="mt-3 pt-3 border-t border-emerald-200/50">
                  <p className="text-[10px] text-sage-600 leading-tight">
                    * Based on government MSP rates and FAQ moisture adjustments
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-emerald-200 bg-emerald-50/50 p-8 text-center">
                <Calculator className="h-12 w-12 text-emerald-300 mx-auto mb-3" />
                <p className="text-sm text-sage-600">
                  Fill in your crop details and click Calculate to see your estimated MSP
                </p>
              </div>
            )}

            <Button 
              onClick={handleReset}
              variant="outline"
              className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Clear and New Calculation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}