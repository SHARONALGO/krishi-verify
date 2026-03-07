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

export function calculateMSP(cropType: string, weight: number, moisturePercentage: number): number {
  const baseRates: Record<string, number> = {
    wheat: 2275,
    rice: 2040,
    maize: 1960,
    bajra: 2150,
    jowar: 2920,
    ragi: 3390,
    cotton: 6020,
    soyabean: 4625,
    groundnut: 5650,
    mustard: 5450,
  };

  const baseRate = baseRates[cropType.toLowerCase()] || 2000;
  
  const moistureFactor = moisturePercentage > 14 ? 1 - ((moisturePercentage - 14) * 0.02) : 1;
  
  const finalAmount = weight * baseRate * moistureFactor;
  
  return Math.round(finalAmount * 100) / 100;
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
