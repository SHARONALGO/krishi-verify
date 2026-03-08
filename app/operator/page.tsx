'use client';

import { useState } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Calculator,
  Weight,
  ShieldAlert,
  FileCheck,
  RefreshCcw,
  Shield,
  Printer,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency, MSP_RATES_2025_27 } from '@/lib/utils';

// Mock Token Data
interface Token {
  id: string;
  farmerName: string;
  cropType: string;
  estimatedWeight: number;
  status: 'arrived' | 'pending' | 'processing';
  arrivalTime: string;
}

const mockTokens: Token[] = [
  { id: 'KR-829', farmerName: 'Rajesh Kumar', cropType: 'Wheat', estimatedWeight: 450, status: 'arrived', arrivalTime: '09:30 AM' },
  { id: 'KR-830', farmerName: 'Suresh Patel', cropType: 'Paddy', estimatedWeight: 320, status: 'processing', arrivalTime: '09:45 AM' },
  { id: 'KR-831', farmerName: 'Amit Singh', cropType: 'Wheat', estimatedWeight: 280, status: 'pending', arrivalTime: '10:00 AM' },
  { id: 'KR-832', farmerName: 'Vikram Rao', cropType: 'Maize', estimatedWeight: 500, status: 'arrived', arrivalTime: '10:15 AM' },
  { id: 'KR-833', farmerName: 'Deepak Sharma', cropType: 'Paddy', estimatedWeight: 380, status: 'pending', arrivalTime: '10:30 AM' },
];

interface CalculationBreakdown {
  baseValue: number;
  moistureDeduction: number;
  impurityDeduction: number;
  totalDeductions: number;
  finalPayout: number;
}

export default function MandiCommandCenter() {
  // Token Selection
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  
  // Grading Desk Inputs
  const [tokenId, setTokenId] = useState('');
  const [cropType, setCropType] = useState('');
  const [actualWeight, setActualWeight] = useState('');
  const [moisture, setMoisture] = useState('14');
  const [impurity, setImpurity] = useState('0');
  
  // Output States
  const [breakdown, setBreakdown] = useState<CalculationBreakdown | null>(null);
  const [showSignature, setShowSignature] = useState(false);
  const [receiptGenerated, setReceiptGenerated] = useState(false);
  const [receiptId, setReceiptId] = useState('');

  const cropOptions = [
    { name: 'Wheat', rate: MSP_RATES_2025_27.wheat },
    { name: 'Paddy', rate: MSP_RATES_2025_27.paddy },
    { name: 'Maize', rate: MSP_RATES_2025_27.maize },
    { name: 'Soyabean', rate: MSP_RATES_2025_27.soyabean },
  ];

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
    setTokenId(token.id);
    setCropType(token.cropType.toLowerCase());
    setActualWeight(token.estimatedWeight.toString());
    setBreakdown(null);
    setReceiptGenerated(false);
  };

  const calculatePayout = () => {
    if (!cropType || !actualWeight) return;
    
    const baseRate = MSP_RATES_2025_27[cropType.toLowerCase()] || 2000;
    const weightInQuintals = parseFloat(actualWeight) / 100;
    const baseValue = baseRate * weightInQuintals;
    
    // Moisture Deduction: 1% price cut for every 1% above 14%
    const moistureContent = parseFloat(moisture) || 14;
    const excessMoisture = Math.max(0, moistureContent - 14);
    const moistureDeduction = baseValue * (excessMoisture / 100);
    
    // Impurity Deduction: Direct weight deduction
    const impurityPercentage = parseFloat(impurity) || 0;
    const impurityDeduction = baseValue * (impurityPercentage / 100);
    
    const totalDeductions = moistureDeduction + impurityDeduction;
    const finalPayout = baseValue - totalDeductions;
    
    setBreakdown({
      baseValue,
      moistureDeduction,
      impurityDeduction,
      totalDeductions,
      finalPayout: Math.round(finalPayout * 100) / 100,
    });
  };

  const handleVerifyAndIssue = async () => {
    setShowSignature(true);
    
    // Simulate digital signature animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const id = `KRISHI-${Date.now().toString(36).toUpperCase()}`;
    setReceiptId(id);
    setReceiptGenerated(true);
    setShowSignature(false);
  };

  const handleReset = () => {
    setSelectedToken(null);
    setTokenId('');
    setCropType('');
    setActualWeight('');
    setMoisture('14');
    setImpurity('0');
    setBreakdown(null);
    setReceiptGenerated(false);
    setReceiptId('');
  };

  const getStatusColor = (status: Token['status']) => {
    switch (status) {
      case 'arrived': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'processing': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'pending': return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusIcon = (status: Token['status']) => {
    switch (status) {
      case 'arrived': return <CheckCircle2 className="h-3.5 w-3.5" />;
      case 'processing': return <Clock className="h-3.5 w-3.5" />;
      case 'pending': return <AlertCircle className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="container px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Mandi Command Center</h1>
            <p className="text-slate-500 text-sm">Official Procurement & Verification Dashboard</p>
          </div>
        </div>
      </div>

      {!receiptGenerated ? (
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left Column - Live Queue (2 columns width) */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-slate-50 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-slate-800">
                    <Users className="mr-2 h-5 w-5 text-teal-600" />
                    Today&apos;s Token Queue
                  </CardTitle>
                  <span className="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                    {mockTokens.filter(t => t.status !== 'pending').length} Active
                  </span>
                </div>
                <CardDescription className="text-slate-600">
                  Live queue of farmers waiting for procurement
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {mockTokens.map((token) => (
                    <button
                      key={token.id}
                      onClick={() => handleTokenSelect(token)}
                      className={`w-full p-4 text-left transition-all hover:bg-slate-50 ${
                        selectedToken?.id === token.id ? 'bg-teal-50 border-l-4 border-l-teal-500' : 'border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-700">{token.id}</span>
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusColor(token.status)}`}>
                            {getStatusIcon(token.status)}
                            <span className="ml-1 capitalize">{token.status}</span>
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">{token.arrivalTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-800">{token.farmerName}</p>
                          <p className="text-sm text-slate-500">{token.cropType} • Est. {token.estimatedWeight}kg</p>
                        </div>
                        {selectedToken?.id === token.id && (
                          <CheckCircle2 className="h-5 w-5 text-teal-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-teal-50 rounded-lg p-3 border border-teal-100 text-center">
                <p className="text-2xl font-bold text-teal-700">{mockTokens.length}</p>
                <p className="text-xs text-teal-600">Total Tokens</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 text-center">
                <p className="text-2xl font-bold text-amber-700">{mockTokens.filter(t => t.status === 'processing').length}</p>
                <p className="text-xs text-amber-600">Processing</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-center">
                <p className="text-2xl font-bold text-slate-700">{mockTokens.filter(t => t.status === 'arrived').length}</p>
                <p className="text-xs text-slate-600">Waiting</p>
              </div>
            </div>
          </div>

          {/* Right Column - Grading Desk (3 columns width) */}
          <div className="lg:col-span-3">
            <Card className="border-slate-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-teal-50 border-b border-slate-100">
                <CardTitle className="flex items-center text-slate-800">
                  <Calculator className="mr-2 h-5 w-5 text-teal-600" />
                  Official Grading Desk
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Process token and calculate official MSP payout
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                {/* Token Input */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Token ID *</label>
                    <Input
                      placeholder="e.g., KR-829"
                      value={tokenId}
                      onChange={(e) => setTokenId(e.target.value)}
                      className="h-11 border-slate-300 font-mono focus-visible:ring-teal-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Crop Type *</label>
                    <select
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                    >
                      <option value="">Select crop...</option>
                      {cropOptions.map((crop) => (
                        <option key={crop.name} value={crop.name.toLowerCase()}>
                          {crop.name} (₹{crop.rate}/q)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Actual Weight (kg) *</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Enter actual weight from mandi scale"
                      value={actualWeight}
                      onChange={(e) => setActualWeight(e.target.value)}
                      className="h-11 pl-11 border-slate-300 focus-visible:ring-teal-600"
                    />
                    <Weight className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  </div>
                </div>

                {/* Quality Parameters */}
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-5">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                    Quality Assessment
                  </h3>

                  {/* Moisture Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Moisture Content (%)</label>
                      <span className="text-lg font-bold text-teal-600">{moisture}%</span>
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
                      <span className="font-semibold text-teal-600">14% (Standard)</span>
                      <span>25%</span>
                    </div>
                    <p className="text-xs text-slate-500 bg-white p-2 rounded border border-slate-200">
                      1% price deduction applied for every 1% above 14% standard
                    </p>
                  </div>

                  {/* Impurity Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Foreign Matter/Impurity (%)</label>
                      <span className="text-lg font-bold text-amber-600">{impurity}%</span>
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
                    <p className="text-xs text-slate-500 bg-white p-2 rounded border border-slate-200">
                      Direct weight deduction for dust, stones, or other impurities
                    </p>
                  </div>
                </div>

                {/* Calculate Button */}
                <Button 
                  onClick={calculatePayout}
                  disabled={!tokenId || !cropType || !actualWeight}
                  className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Official Payout
                </Button>

                {/* Calculation Results */}
                {breakdown && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-5 bg-slate-50 rounded-xl border-2 border-slate-200 space-y-3">
                      <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Payout Breakdown</h4>
                      
                      {/* Base Value */}
                      <div className="flex items-center justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Base MSP Value</span>
                        <span className="text-lg font-semibold text-slate-800">{formatCurrency(breakdown.baseValue)}</span>
                      </div>
                      
                      {/* Deductions */}
                      {(breakdown.moistureDeduction > 0 || breakdown.impurityDeduction > 0) && (
                        <div className="space-y-2 py-2 border-b border-slate-200">
                          <p className="text-sm font-semibold text-red-700">Quality Deductions</p>
                          {breakdown.moistureDeduction > 0 && (
                            <div className="flex items-center justify-between text-red-600">
                              <span className="text-sm">Moisture Penalty</span>
                              <span className="font-medium">-{formatCurrency(breakdown.moistureDeduction)}</span>
                            </div>
                          )}
                          {breakdown.impurityDeduction > 0 && (
                            <div className="flex items-center justify-between text-red-600">
                              <span className="text-sm">Impurity Deduction</span>
                              <span className="font-medium">-{formatCurrency(breakdown.impurityDeduction)}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-red-800 font-semibold pt-1">
                            <span>Total Deductions</span>
                            <span>-{formatCurrency(breakdown.totalDeductions)}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Final Calculation */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-slate-800">Final Net Payout</span>
                        <span className="text-2xl font-extrabold text-teal-700">{formatCurrency(breakdown.finalPayout)}</span>
                      </div>
                    </div>

                    {/* Verify & Issue Button */}
                    <Button 
                      onClick={handleVerifyAndIssue}
                      disabled={showSignature}
                      className="w-full h-14 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-bold text-lg shadow-lg"
                    >
                      {showSignature ? (
                        <>
                          <Shield className="mr-2 h-5 w-5 animate-pulse" />
                          Digitally Signing...
                        </>
                      ) : (
                        <>
                          <FileCheck className="mr-2 h-5 w-5" />
                          Verify & Issue Receipt
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Receipt Success State */
        <div className="max-w-2xl mx-auto">
          <Card className="border-teal-200 shadow-xl">
            <CardContent className="p-8">
              {/* Digital Signature Animation */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 mb-4 shadow-lg">
                  <Shield className="h-12 w-12 text-teal-700" />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full mb-3">
                  <CheckCircle2 className="h-4 w-4 text-teal-700" />
                  <span className="text-sm font-bold text-teal-800">Digitally Signed & Verified</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Official Receipt Issued</h2>
                <p className="text-slate-500 font-mono mt-2">{receiptId}</p>
              </div>

              {breakdown && (
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                  <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-200">
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Token ID</p>
                      <p className="font-mono font-bold text-slate-800">{tokenId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Date & Time</p>
                      <p className="font-semibold text-slate-800">{new Date().toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Crop Type</p>
                      <p className="font-semibold text-slate-800 capitalize">{cropType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Net Weight</p>
                      <p className="font-semibold text-slate-800">{actualWeight} kg</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Base MSP Value</span>
                      <span className="font-medium">{formatCurrency(breakdown.baseValue)}</span>
                    </div>
                    {breakdown.totalDeductions > 0 && (
                      <div className="flex justify-between text-sm text-red-600">
                        <span>Quality Deductions</span>
                        <span className="font-medium">-{formatCurrency(breakdown.totalDeductions)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center bg-teal-50 p-4 rounded-lg">
                    <span className="text-lg font-bold text-slate-800">Final Payout</span>
                    <span className="text-3xl font-extrabold text-teal-700">
                      {formatCurrency(breakdown.finalPayout)}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  className="flex-1 border-slate-300 h-12"
                  onClick={handleReset}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Process Next Token
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-slate-300 h-12"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button 
                  className="flex-1 bg-teal-600 hover:bg-teal-700 h-12"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-500">
          Rates based on CCEA 2025-27 Marketing Season guidelines • MSP rates in ₹ per Quintal
        </p>
      </div>
    </div>
  );
}
