'use client';

import { useState } from 'react';
import { Calculator, Sprout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { calculateMSP, formatCurrency } from '@/lib/utils';

export default function FarmerCalculatorPage() {
  const [cropType, setCropType] = useState('');
  const [weight, setWeight] = useState('');
  const [moisture, setMoisture] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const handleCalculate = () => {
    if (!cropType || !weight || !moisture) return;
    const price = calculateMSP(cropType, parseFloat(weight), parseFloat(moisture));
    setEstimatedPrice(price);
  };

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold text-emerald-900 mb-2">MSP What-If Calculator</h1>
      <p className="text-forest-700 mb-8">Estimate your expected fair price before visiting the mandi</p>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-600" />
              Price Estimator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-forest-700">Crop Type</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="flex h-10 w-full rounded-md border border-emerald-300 bg-white px-3 py-2"
              >
                <option value="">Select crop...</option>
                {['Wheat', 'Rice', 'Maize', 'Bajra', 'Cotton', 'Soyabean'].map((crop) => (
                  <option key={crop} value={crop.toLowerCase()}>{crop}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-forest-700">Weight (kg)</label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter expected weight"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-forest-700">Moisture %</label>
              <Input
                type="number"
                step="0.1"
                value={moisture}
                onChange={(e) => setMoisture(e.target.value)}
                placeholder="Expected moisture level"
              />
            </div>

            <Button onClick={handleCalculate} className="w-full">
              Calculate Estimated Price
            </Button>

            {estimatedPrice !== null && (
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-sage-700">Estimated Fair Price</p>ī
                <p className="text-3xl font-bold text-emerald-700">{formatCurrency(estimatedPrice)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}