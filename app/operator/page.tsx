'use client';

import { useState } from 'react';
import { CropEntryForm } from '@/components/operator/CropEntryForm';
import { AutoMSPCalculator } from '@/components/operator/AutoMSPCalculator';
import { ReceiptGenerator } from '@/components/operator/ReceiptGenerator';
import { TransparencyEngine, calculateMSP } from '@/lib/utils';
import type { CropEntry } from '@/lib/types';

export default function OperatorPage() {
  const [cropType, setCropType] = useState('');
  const [weight, setWeight] = useState('');
  const [moisture, setMoisture] = useState('');
  const [calculatedMSP, setCalculatedMSP] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [receipt, setReceipt] = useState<CropEntry | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [miningProgress, setMiningProgress] = useState(0);

  const handleCalculateMSP = async () => {
    if (!cropType || !weight || !moisture) return;
    
    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
      cropType,
      weight: parseFloat(weight),
      moisturePercentage: parseFloat(moisture),
      mspRate: calculatedMSP,
      timestamp: new Date().toISOString(),
    };
    
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
    setCropType('');
    setWeight('');
    setMoisture('');
    setCalculatedMSP(null);
    setReceipt(null);
    setMiningProgress(0);
  };

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Operator Portal</h1>
        <p className="text-forest-700">
          Enter crop details and generate tamper-proof receipts for farmers.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CropEntryForm
          cropType={cropType}
          weight={weight}
          moisture={moisture}
          onCropTypeChange={setCropType}
          onWeightChange={setWeight}
          onMoistureChange={setMoisture}
          onCalculate={handleCalculateMSP}
          isCalculating={isCalculating}
        />

        <AutoMSPCalculator
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
