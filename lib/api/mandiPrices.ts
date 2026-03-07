// Mandi/Market Price API Service
// Data source: data.gov.in - Agricultural Marketing Information

const API_KEY = '579b464db66ec23bdd000001ad6573dc2943481c6d4e5b348a42f154';
const BASE_URL = 'https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24';

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
