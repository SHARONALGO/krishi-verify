import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class TransparencyEngine {
  static generateHash(data: Record<string, unknown>): string {
    const jsonString = JSON.stringify(data);
    return CryptoJS.SHA256(jsonString).toString(CryptoJS.enc.Hex);
  }

  static generateMerkleRoot(hashes: string[]): string {
    if (hashes.length === 0) {
      return this.generateHash({ empty: true, timestamp: Date.now() });
    }

    if (hashes.length === 1) {
      return hashes[0];
    }

    const newLevel: string[] = [];
    for (let i = 0; i < hashes.length; i += 2) {
      const left = hashes[i];
      const right = i + 1 < hashes.length ? hashes[i + 1] : left;
      const combined = this.generateHash({ left, right });
      newLevel.push(combined);
    }

    return this.generateMerkleRoot(newLevel);
  }

  static simulateMiningProgress(callback: (progress: number) => void): Promise<string> {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          const mockHash = this.generateHash({ 
            timestamp: Date.now(), 
            nonce: Math.random() 
          });
          callback(100);
          resolve(mockHash);
        } else {
          callback(progress);
        }
      }, 200);
    });
  }

  static validateIntegrity(data: Record<string, unknown>, providedHash: string): boolean {
    const computedHash = this.generateHash(data);
    return computedHash === providedHash;
  }
}

// Official MSP Rates 2025-27 (₹ per Quintal) - CCEA Approved
export const MSP_RATES_2025_27: Record<string, number> = {
  wheat: 2585,
  paddy: 2369,
  maize: 2400,
  moong: 8768,
  mustard: 6200,
  soyabean: 5328,
  // Fallback rates for other crops
  rice: 2369,
  bajra: 2150,
  jowar: 2920,
  ragi: 3390,
  cotton: 6020,
  groundnut: 5650,
};

export interface MSPBreakdown {
  basePrice: number;
  weightInQuintals: number;
  moistureDeductionPercentage: number;
  moistureDeductionAmount: number;
  qualityBonus: number;
  finalPayout: number;
}

export function calculateMSP(cropType: string, weight: number, moisturePercentage: number): number {
  const baseRate = MSP_RATES_2025_27[cropType.toLowerCase()] || 2000;
  
  // Moisture Deduction: Standard is 14%, deduct 0.75% for every 1% above
  const moistureDeduction = moisturePercentage > 14 ? (moisturePercentage - 14) * 0.75 : 0;
  const moistureFactor = Math.max(0, 1 - (moistureDeduction / 100));
  
  const finalAmount = weight * baseRate * moistureFactor;
  
  return Math.round(finalAmount * 100) / 100;
}

export function calculateMSPWithBreakdown(
  cropType: string, 
  weightInKg: number, 
  moisturePercentage: number,
  qualityScore: number = 1
): MSPBreakdown {
  const basePrice = MSP_RATES_2025_27[cropType.toLowerCase()] || 2000;
  const weightInQuintals = weightInKg / 100;
  
  // Moisture Deduction Calculation
  const standardMoisture = 14;
  const excessMoisture = Math.max(0, moisturePercentage - standardMoisture);
  const moistureDeductionPercentage = excessMoisture * 0.75;
  
  // Calculate deduction amount from base
  const moistureDeductionAmount = (basePrice * weightInQuintals) * (moistureDeductionPercentage / 100);
  
  // Quality Bonus (if quality score > 1)
  const qualityBonus = qualityScore > 1 ? (basePrice * weightInQuintals) * (qualityScore - 1) : 0;
  
  // Final Payout
  const baseAmount = basePrice * weightInQuintals;
  const finalPayout = baseAmount - moistureDeductionAmount + qualityBonus;
  
  return {
    basePrice,
    weightInQuintals,
    moistureDeductionPercentage,
    moistureDeductionAmount,
    qualityBonus,
    finalPayout: Math.round(finalPayout * 100) / 100,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

