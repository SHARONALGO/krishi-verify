// Mandi/Market Price API Service
// Data source: data.gov.in - Agricultural Marketing Information

const API_KEY = '579b464db66ec23bdd000001ad6573dc2943481c6d4e5b348a42f154';
const BASE_URL = 'https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24';

// Alternative API endpoint for commodity prices
const API_KEY_2 = '579b464db66ec23bdd000001f6303db3e4f4451b5adf75fd9b6e8e42';
const BASE_URL_2 = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

export interface MandiPriceRecord {
  // Location Data
  state: string;
  district: string;
  market: string;
  
  // Commodity Details
  commodity: string;
  variety: string;
  grade: string;
  commodity_code?: string;
  
  // Pricing Data
  min_price: number;
  max_price: number;
  modal_price: number; // Most common/average price
  
  // Date
  arrival_date: string;
  
  // Metadata
  source?: string;
  updated_date?: string;
}

export interface MandiPriceFilters {
  state?: string;
  district?: string;
  market?: string;
  commodity?: string;
  limit?: number;
  offset?: number;
}

// Raw API response record type - data.gov.in uses TitleCase field names
interface ApiPriceRecord {
  State?: string;
  District?: string;
  Market?: string;
  Commodity?: string;
  Variety?: string;
  Grade?: string;
  Commodity_Code?: string;
  Min_Price?: string | number;
  Max_Price?: string | number;
  Modal_Price?: string | number;
  Arrival_Date?: string;
  Source?: string;
  Updated_Date?: string;
  // Also include lowercase versions for compatibility
  state?: string;
  district?: string;
  market?: string;
  commodity?: string;
  variety?: string;
  grade?: string;
  commodity_code?: string;
  min_price?: string | number;
  max_price?: string | number;
  modal_price?: string | number;
  arrival_date?: string;
  source?: string;
  updated_date?: string;
}

/**
 * Fetch mandi prices from data.gov.in API
 */
export async function fetchMandiPrices(filters: MandiPriceFilters = {}): Promise<MandiPriceRecord[]> {
  const { state, district, market, commodity, limit = 100, offset = 0 } = filters;
  
  // Build query parameters
  const params = new URLSearchParams({
    'api-key': API_KEY,
    'format': 'json',
    'limit': limit.toString(),
    'offset': offset.toString(),
  });
  
  // Add filters if provided
  if (state) params.append('filters[state]', state);
  if (district) params.append('filters[district]', district);
  if (market) params.append('filters[market]', market);
  if (commodity) params.append('filters[commodity]', commodity);
  
  const url = `${BASE_URL}?${params.toString()}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Debug: Log the first record to see actual field names
    if (data.records && data.records.length > 0) {
      console.log('API Response sample:', data.records[0]);
    }
    
    // Transform API response to our interface
    // data.gov.in uses TitleCase field names (e.g., State, District, Market)
    if (data.records && Array.isArray(data.records)) {
      const transformed = data.records.map((record: ApiPriceRecord) => ({
        state: record.State || record.state || '',
        district: record.District || record.district || '',
        market: record.Market || record.market || '',
        commodity: record.Commodity || record.commodity || '',
        variety: record.Variety || record.variety || '',
        grade: record.Grade || record.grade || '',
        commodity_code: record.Commodity_Code || record.commodity_code || '',
        min_price: parseFloat(String(record.Min_Price || record.min_price || '0')),
        max_price: parseFloat(String(record.Max_Price || record.max_price || '0')),
        modal_price: parseFloat(String(record.Modal_Price || record.modal_price || '0')),
        arrival_date: record.Arrival_Date || record.arrival_date || '',
        source: record.Source || record.source || '',
        updated_date: record.Updated_Date || record.updated_date || '',
      }));
      
      // Filter out records with empty critical fields
      return transformed.filter((r: MandiPriceRecord) => r.state && r.commodity && r.modal_price > 0);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching mandi prices:', error);
    throw error;
  }
}

/**
 * Get unique states from the API
 */
export async function getStates(): Promise<string[]> {
  try {
    const records = await fetchMandiPrices({ limit: 1000 });
    const states = [...new Set(records.map(r => r.state))].filter(Boolean).sort();
    return states;
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
}

/**
 * Get unique districts for a state
 */
export async function getDistricts(state: string): Promise<string[]> {
  try {
    const records = await fetchMandiPrices({ state, limit: 1000 });
    const districts = [...new Set(records.map(r => r.district))].filter(Boolean).sort();
    return districts;
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
}

/**
 * Get unique markets for a district
 */
export async function getMarkets(state: string, district: string): Promise<string[]> {
  try {
    const records = await fetchMandiPrices({ state, district, limit: 1000 });
    const markets = [...new Set(records.map(r => r.market))].filter(Boolean).sort();
    return markets;
  } catch (error) {
    console.error('Error fetching markets:', error);
    return [];
  }
}

/**
 * Get unique commodities
 */
export async function getCommodities(): Promise<string[]> {
  try {
    const records = await fetchMandiPrices({ limit: 1000 });
    const commodities = [...new Set(records.map(r => r.commodity))].filter(Boolean).sort();
    return commodities;
  } catch (error) {
    console.error('Error fetching commodities:', error);
    return [];
  }
}

/**
 * Get price trend for a specific commodity in a market
 */
export async function getPriceTrend(
  state: string,
  district: string,
  market: string,
  commodity: string,
  days: number = 7
): Promise<MandiPriceRecord[]> {
  try {
    const records = await fetchMandiPrices({
      state,
      district,
      market,
      commodity,
      limit: days * 5, // Get more records to filter by date
    });
    
    // Sort by arrival date (most recent first)
    return records
      .filter(r => r.arrival_date)
      .sort((a, b) => new Date(b.arrival_date).getTime() - new Date(a.arrival_date).getTime())
      .slice(0, days);
  } catch (error) {
    console.error('Error fetching price trend:', error);
    return [];
  }
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Get price comparison (current vs previous day)
 */
export function getPriceChange(current: number, previous: number): {
  change: number;
  percentChange: number;
  isPositive: boolean;
} {
  const change = current - previous;
  const percentChange = previous > 0 ? (change / previous) * 100 : 0;
  return {
    change,
    percentChange,
    isPositive: change >= 0,
  };
}

// ============================================
// QUALITY-BASED PRICING CALCULATIONS
// ============================================

export interface QualityParams {
  grainSize: number; // in mm
  purityPercentage: number; // 0-100
  weight: number; // in kg
  moisture: number; // 0-100
}

export interface QualityResult {
  qualityScore: number;
  grade: 'A' | 'FAQ' | 'B' | 'C';
  normalizedSize: number;
  normalizedPurity: number;
  normalizedWeight: number;
  normalizedMoisture: number;
}

// Reference values for normalization
const REFERENCE = {
  maxGrainSize: 8, // mm
  maxPurity: 100, // %
  maxWeight: 50, // kg (per sample)
  maxMoisture: 20, // % (above this is poor quality)
  optimalMoisture: 12, // % (optimal moisture level)
};

// Weights for quality calculation
const WEIGHTS = {
  size: 0.35,
  purity: 0.30,
  weight: 0.20,
  moisture: 0.15,
};

/**
 * Normalize input values to 0-1 range
 */
function normalizeValue(value: number, max: number): number {
  return Math.min(value / max, 1);
}

/**
 * Normalize moisture (lower is better, optimal is 12%)
 * Returns a value where 1 = optimal (12%), 0 = very high moisture
 */
function normalizeMoisture(moisture: number): number {
  if (moisture <= REFERENCE.optimalMoisture) {
    return 1; // Optimal or lower
  }
  // Linear decrease from optimal to max
  const excess = moisture - REFERENCE.optimalMoisture;
  const maxExcess = REFERENCE.maxMoisture - REFERENCE.optimalMoisture;
  return Math.max(0, 1 - (excess / maxExcess));
}

/**
 * Calculate quality score and grade based on crop parameters
 * Formula: Q = 0.35*S + 0.30*P + 0.20*W - 0.15*M
 */
export function calculateQuality(params: QualityParams): QualityResult {
  // Normalize values
  const normalizedSize = normalizeValue(params.grainSize, REFERENCE.maxGrainSize);
  const normalizedPurity = normalizeValue(params.purityPercentage, REFERENCE.maxPurity);
  const normalizedWeight = normalizeValue(params.weight, REFERENCE.maxWeight);
  const normalizedMoisture = normalizeMoisture(params.moisture);

  // Calculate quality score
  const qualityScore = 
    (WEIGHTS.size * normalizedSize) +
    (WEIGHTS.purity * normalizedPurity) +
    (WEIGHTS.weight * normalizedWeight) -
    (WEIGHTS.moisture * (1 - normalizedMoisture));

  // Clamp quality score between 0 and 1
  const clampedScore = Math.max(0, Math.min(1, qualityScore));

  // Assign grade
  let grade: QualityResult['grade'];
  if (clampedScore >= 0.80) {
    grade = 'A';
  } else if (clampedScore >= 0.65) {
    grade = 'FAQ';
  } else if (clampedScore >= 0.50) {
    grade = 'B';
  } else {
    grade = 'C';
  }

  return {
    qualityScore: clampedScore,
    grade,
    normalizedSize,
    normalizedPurity,
    normalizedWeight,
    normalizedMoisture,
  };
}

/**
 * Calculate final price based on base modal price and quality score
 * Formula: Price = BasePrice × (1 + Q)
 */
export function calculateQualityPrice(basePrice: number, qualityScore: number): number {
  return basePrice * (1 + qualityScore);
}

export interface CommodityPriceData {
  commodity: string;
  variety: string;
  grade: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
}

/**
 * Fetch commodity price data from local API route (proxies to data.gov.in)
 * Returns min_price, max_price, modal_price, grade, variety
 */
export async function fetchCommodityPrice(commodity: string): Promise<CommodityPriceData | null> {
  try {
    // Use local API route to avoid CORS issues
    const params = new URLSearchParams({
      'commodity': commodity,
    });

    const url = `/api/mandi-prices?${params.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.records && data.records.length > 0) {
      // Get the first record with all price data
      const record = data.records[0];
      
      // Handle both TitleCase and lowercase field names
      const minPrice = parseFloat(String(record.Min_Price || record.min_price || '0'));
      const maxPrice = parseFloat(String(record.Max_Price || record.max_price || '0'));
      const modalPrice = parseFloat(String(record.Modal_Price || record.modal_price || '0'));
      
      return {
        commodity: record.Commodity || record.commodity || commodity,
        variety: record.Variety || record.variety || 'Other',
        grade: record.Grade || record.grade || 'FAQ',
        minPrice,
        maxPrice,
        modalPrice,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching commodity price:', error);
    return null;
  }
}

/**
 * Fetch modal price for a specific commodity from API (legacy function)
 */
export async function fetchModalPrice(commodity: string): Promise<number | null> {
  const data = await fetchCommodityPrice(commodity);
  return data?.modalPrice || null;
}

/**
 * Get grade color for UI display
 */
export function getGradeColor(grade: QualityResult['grade']): string {
  switch (grade) {
    case 'A':
      return 'text-emerald-600 bg-emerald-100';
    case 'FAQ':
      return 'text-blue-600 bg-blue-100';
    case 'B':
      return 'text-amber-600 bg-amber-100';
    case 'C':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-slate-600 bg-slate-100';
  }
}
