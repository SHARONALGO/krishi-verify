export interface CropEntry {
  id: string;
  cropType: string;
  weight: number;
  moisturePercentage: number;
  mspRate: number;
  timestamp: string;
  hash: string;
  merkleRoot: string;
}

export interface FarmerDashboardData {
  totalTransactions: number;
  totalEarnings: number;
  averageMSP: number;
  recentReceipts: CropEntry[];
}

export interface PublicMetrics {
  totalProcurement: number;
  activeOperators: number;
  verifiedTransactions: number;
  averageTurnaround: string;
}

export type Page = 'landing' | 'operator' | 'farmer' | 'public';
