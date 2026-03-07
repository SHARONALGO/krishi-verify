'use client';
import { useState } from 'react';
import { CropEntryForm } from '@/components/operator/CropEntryForm';
import { AutoMSPCalculator } from '@/components/operator/AutoMSPCalculator';
import { ReceiptGenerator } from '@/components/operator/ReceiptGenerator';
import { TransparencyEngine, calculateMSP } from '@/lib/utils';
import type { CropEntry } from '@/lib/types';

export default function OperatorPage() {
  // Location States
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [market, setMarket] = useState('');
  
  // Crop Details States
  const [cropType, setCropType] = useState('');
  const [weight, setWeight] = useState('');
  const [moisture, setMoisture] = useState('');
  
  // Processing States
  const [calculatedMSP, setCalculatedMSP] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [receipt, setReceipt] = useState<CropEntry | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [miningProgress, setMiningProgress] = useState(0);

  const handleCalculateMSP = async () => {
    // Ensure location data is also present
    if (!state || !district || !market || !cropType || !weight || !moisture) {
      alert("Please fill in all location and crop details.");
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real scenario, calculateMSP would now also take location into account
    // for regional price variations found in your CSV
    const msp = calculateMSP(
      cropType,
      parseFloat(weight),
      parseFloat(moisture)
    );
    
    setCalculatedMSP(msp);
    setIsCalculating(false);
  };

  const handleGenerateReceipt = async () => {
    if (!calculatedMSP) return;
    
    setIsGenerating(true);
    setMiningProgress(0);
    
    const entryData = {
      state,
      district,
      market,
      cropType,
      weight: parseFloat(weight),
      moisturePercentage: parseFloat(moisture),
      mspRate: calculatedMSP,
      timestamp: new Date().toISOString(),
    };
    
    // Generating hash including the new location data for tamper-proof audit trails
    const hash = TransparencyEngine.generateHash(entryData);
    
    // Simulate mining/verification process
    const finalHash = await TransparencyEngine.simulateMiningProgress(setMiningProgress);
    
    const newReceipt: CropEntry = {
      id: hash.substring(0, 12),
      ...entryData,
      hash: finalHash,
      merkleRoot: TransparencyEngine.generateMerkleRoot([finalHash]),
    };
    
    setReceipt(newReceipt);
    setIsGenerating(false);
  };

  const resetForm = () => {
    setState('');
    setDistrict('');
    setMarket('');
    setCropType('');
    setWeight('');
    setMoisture('');
    setCalculatedMSP(null);
    setReceipt(null);
    setMiningProgress(0);
  };

  return (
    <div className="px-4 md:px-6 py-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Operator Portal</h1>
        <p className="text-slate-600">
          Enter location and crop details to generate tamper-proof receipts for farmers.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pass location props to the form */}
        <CropEntryForm
          state={state}
          district={district}
          market={market}
          cropType={cropType}
          weight={weight}
          moisture={moisture}
          onStateChange={setState}
          onDistrictChange={setDistrict}
          onMarketChange={setMarket}
          onCropTypeChange={setCropType}
          onWeightChange={setWeight}
          onMoistureChange={setMoisture}
          onCalculate={handleCalculateMSP}
          isCalculating={isCalculating}
        />

        <AutoMSPCalculator
          state={state}
          district={district}
          market={market}
          cropType={cropType}
          weight={weight}
          moisture={moisture}
          calculatedMSP={calculatedMSP}
          onGenerateReceipt={handleGenerateReceipt}
          onReset={resetForm}
          isGenerating={isGenerating}
          miningProgress={miningProgress}
        />
      </div>

      {receipt && (
        <ReceiptGenerator receipt={receipt} onNewEntry={resetForm} />
      )}
    </div>
  );
}
