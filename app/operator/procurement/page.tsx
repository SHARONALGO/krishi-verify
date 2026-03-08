'use client';

import { useState, useEffect } from 'react';
import { 
  Calculator, 
  Weight, 
  ShieldAlert, 
  TrendingUp, 
  RefreshCcw, 
  User, 
  CheckCircle2,
  FileCheck,
  Download,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { formatCurrency, MSP_RATES_2025_27 } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';

interface Farmer {
  id: string;
  full_name: string;
}

interface ProcurementBreakdown {
  basePrice: number;
  weightInQuintals: number;
  grossAmount: number;
  moistureDeductionPercentage: number;
  moistureDeductionAmount: number;
  impurityDeductionPercentage: number;
  impurityDeductionAmount: number;
  totalDeductions: number;
  finalPayout: number;
}

export default function ProcurementDeskPage() {
  // Farmer Selection
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [selectedFarmer, setSelectedFarmer] = useState('');
  
  // Input Fields
  const [cropType, setCropType] = useState('');
  const [weight, setWeight] = useState('');
  const [moisture, setMoisture] = useState('14');
  const [impurity, setImpurity] = useState('0');
  
  // Output States
  const [breakdown, setBreakdown] = useState<ProcurementBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [receiptGenerated, setReceiptGenerated] = useState(false);
  const [receiptId, setReceiptId] = useState('');

  // Fetch farmers list
  useEffect(() => {
    const fetchFarmers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'farmer');
      
      if (!error && data) {
        setFarmers(data);
      }
    };
    fetchFarmers();
  }, []);

  const cropOptions = [
    { name: 'Wheat', rate: MSP_RATES_2025_27.wheat },
    { name: 'Paddy', rate: MSP_RATES_2025_27.paddy },
    { name: 'Maize', rate: MSP_RATES_2025_27.maize },
    { name: 'Soyabean', rate: MSP_RATES_2025_27.soyabean },
    { name: 'Moong', rate: MSP_RATES_2025_27.moong },
    { name: 'Mustard', rate: MSP_RATES_2025_27.mustard },
  ];

  const calculateProcurement = () => {
    if (!cropType || !weight) return;
    
    setIsCalculating(true);
    
    const basePrice = MSP_RATES_2025_27[cropType.toLowerCase()] || 2000;
    const weightInQuintals = parseFloat(weight) / 100;
    const grossAmount = basePrice * weightInQuintals;
    
    // Moisture Deduction: 1% price deduction for every 1% above 14%
    const moistureContent = parseFloat(moisture) || 14;
    const excessMoisture = Math.max(0, moistureContent - 14);
    const moistureDeductionPercentage = excessMoisture;
    const moistureDeductionAmount = grossAmount * (moistureDeductionPercentage / 100);
    
    // Impurity Deduction: Direct weight deduction
    const impurityPercentage = parseFloat(impurity) || 0;
    const impurityDeductionAmount = grossAmount * (impurityPercentage / 100);
    
    const totalDeductions = moistureDeductionAmount + impurityDeductionAmount;
    const finalPayout = grossAmount - totalDeductions;
    
    setBreakdown({
      basePrice,
      weightInQuintals,
      grossAmount,
      moistureDeductionPercentage,
      moistureDeductionAmount,
      impurityDeductionPercentage: impurityPercentage,
      impurityDeductionAmount,
      totalDeductions,
      finalPayout: Math.round(finalPayout * 100) / 100,
    });
    
    setIsCalculating(false);
    setReceiptGenerated(false);
  };

  const generateReceipt = () => {
    // Generate unique receipt ID
    const id = `KRISHI-${Date.now().toString(36).toUpperCase()}`;
    setReceiptId(id);
    setReceiptGenerated(true);
  };

  const handleReset = () => {
    setSelectedFarmer('');
    setCropType('');
    setWeight('');
    setMoisture('14');
    setImpurity('0');
    setBreakdown(null);
    setReceiptGenerated(false);
    setReceiptId('');
  };

  const selectedFarmerName = farmers.find(f => f.id === selectedFarmer)?.full_name || '';

  return (
    <div className="container px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
            Operator Console
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-800">Procurement Desk</h1>
        <p className="text-slate-600 mt-1">
          Calculate official MSP payout with quality-based deductions
        </p>
      </div>

      {!receiptGenerated ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Input Form */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50">
              <CardTitle className="flex items-center text-slate-800">
                <User className="mr-2 h-5 w-5 text-teal-600" />
                Farmer & Crop Details
              </CardTitle>
              <CardDescription className="text-slate-600">
                Select farmer and enter quality parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              
              {/* Farmer Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Select Farmer *</label>
                <select
                  value={selectedFarmer}
                  onChange={(e) => setSelectedFarmer(e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:border-teal-600 transition-colors"
                >
                  <option value="">-- Select a Farmer --</option>
                  {farmers.map((farmer) => (
                    <option key={farmer.id} value={farmer.id}>
                      {farmer.full_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Crop Type */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Crop Type *</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:border-teal-600 transition-colors"
                >
                  <option value="">-- Select Crop --</option>
                  {cropOptions.map((crop) => (
                    <option key={crop.name} value={crop.name.toLowerCase()}>
                      {crop.name} (₹{crop.rate}/q)
                    </option>
                  ))}
                </select>
              </div>

              {/* Weight Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Weight (kg) *</label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter weight in kilograms"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="pl-11 h-11 border-slate-300 focus-visible:ring-teal-600"
                  />
                  <Weight className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                </div>
              </div>

              {/* Quality Parameters Section */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-500" />
                  Quality Parameters
                </h3>

                {/* Moisture Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">Moisture Content (%)</label>
                    <span className="text-sm font-bold text-teal-600">{moisture}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    step="0.5"
                    value={moisture}
                    onChange={(e) => setMoisture(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>10%</span>
                    <span className="font-medium text-teal-600">14% (Standard)</span>
                    <span>25%</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    1% price deduction for every 1% above 14%
                  </p>
                </div>

                {/* Impurity/Refraction */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">Impurity/Refraction (%)</label>
                    <span className="text-sm font-bold text-amber-600">{impurity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={impurity}
                    onChange={(e) => setImpurity(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>0%</span>
                    <span>5%</span>
                    <span>10%</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Direct weight deduction for dust/stones
                  </p>
                </div>
              </div>

              {/* Calculate Button */}
              <Button 
                onClick={calculateProcurement}
                disabled={!selectedFarmer || !cropType || !weight || isCalculating}
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors"
              >
                {isCalculating ? (
                  <>
                    <TrendingUp className="mr-2 h-5 w-5 animate-pulse" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate Payout
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Right Column - Results */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50">
              <CardTitle className="flex items-center text-slate-800">
                <FileCheck className="mr-2 h-5 w-5 text-teal-600" />
                Payout Calculation
              </CardTitle>
              <CardDescription className="text-slate-600">
                Official MSP calculation with quality deductions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              
              {breakdown ? (
                <div className="space-y-4">
                  {/* Farmer Info */}
                  <div className="p-3 bg-teal-50 rounded-lg border border-teal-100">
                    <p className="text-xs text-teal-600 uppercase tracking-wider font-semibold">Farmer</p>
                    <p className="text-lg font-bold text-teal-900">{selectedFarmerName}</p>
                  </div>

                  {/* Base MSP Value */}
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Base MSP Value</span>
                      <span className="text-sm font-medium text-slate-800">
                        ₹{breakdown.basePrice}/q × {breakdown.weightInQuintals.toFixed(2)}q
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-base font-semibold text-slate-800">Gross Amount</span>
                      <span className="text-xl font-bold text-slate-900">
                        {formatCurrency(breakdown.grossAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Quality Deductions */}
                  {(breakdown.moistureDeductionAmount > 0 || breakdown.impurityDeductionAmount > 0) && (
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                      <p className="text-sm font-semibold text-red-800 mb-3">Quality Deductions</p>
                      
                      {breakdown.moistureDeductionAmount > 0 && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-red-700">
                            Moisture ({breakdown.moistureDeductionPercentage.toFixed(1)}% excess)
                          </span>
                          <span className="text-base font-semibold text-red-700">
                            -{formatCurrency(breakdown.moistureDeductionAmount)}
                          </span>
                        </div>
                      )}
                      
                      {breakdown.impurityDeductionAmount > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-700">
                            Impurity ({breakdown.impurityDeductionPercentage.toFixed(1)}%)
                          </span>
                          <span className="text-base font-semibold text-red-700">
                            -{formatCurrency(breakdown.impurityDeductionAmount)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-red-200">
                        <span className="text-sm font-bold text-red-800">Total Deductions</span>
                        <span className="text-lg font-bold text-red-800">
                          -{formatCurrency(breakdown.totalDeductions)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Final Net Payout */}
                  <div className="p-6 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-teal-100 font-medium">Final Net Payout</span>
                      <CheckCircle2 className="h-6 w-6 text-teal-200" />
                    </div>
                    <div className="text-5xl font-extrabold tracking-tight">
                      {formatCurrency(breakdown.finalPayout)}
                    </div>
                    <p className="text-teal-200 text-sm mt-2">
                      Amount to be transferred to farmer&apos;s account
                    </p>
                  </div>

                  {/* Generate Receipt Button */}
                  <Button 
                    onClick={generateReceipt}
                    className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-semibold"
                  >
                    <FileCheck className="mr-2 h-5 w-5" />
                    Generate Digital Receipt
                  </Button>
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
                  <Calculator className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">
                    Enter farmer details and click Calculate
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    The payout breakdown will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Receipt Success State */
        <Card className="border-teal-200 shadow-lg max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 mb-4">
                <CheckCircle2 className="h-10 w-10 text-teal-600" />
              </div>
              <span className="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-800 mb-3">
                <FileCheck className="h-3 w-3 mr-1" />
                Signed & Verified
              </span>
              <h2 className="text-2xl font-bold text-slate-800">Digital Receipt Generated</h2>
              <p className="text-slate-600 mt-1">Receipt ID: <span className="font-mono font-semibold">{receiptId}</span></p>
            </div>

            {breakdown && (
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Farmer</p>
                    <p className="font-semibold text-slate-800">{selectedFarmerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Crop</p>
                    <p className="font-semibold text-slate-800 capitalize">{cropType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Weight</p>
                    <p className="font-semibold text-slate-800">{weight} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Date</p>
                    <p className="font-semibold text-slate-800">{new Date().toLocaleDateString('en-IN')}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Gross Amount</span>
                    <span className="font-medium">{formatCurrency(breakdown.grossAmount)}</span>
                  </div>
                  {breakdown.totalDeductions > 0 && (
                    <div className="flex justify-between text-sm text-red-600">
                      <span>Total Deductions</span>
                      <span className="font-medium">-{formatCurrency(breakdown.totalDeductions)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-800">Final Payout</span>
                  <span className="text-2xl font-extrabold text-teal-700">
                    {formatCurrency(breakdown.finalPayout)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1 border-slate-300"
                onClick={() => setReceiptGenerated(false)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-slate-300"
                onClick={handleReset}
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                New Calculation
              </Button>
              <Button 
                className="flex-1 bg-teal-600 hover:bg-teal-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-500">
          Rates based on CCEA 2025-27 Marketing Season guidelines • MSP rates in ₹ per Quintal
        </p>
      </div>
    </div>
  );
}
