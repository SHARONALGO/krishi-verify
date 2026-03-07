'use client';

import { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Calendar, Search, Filter, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  fetchMandiPrices, 
  getStates, 
  getDistricts, 
  getCommodities,
  formatPrice,
  type MandiPriceRecord 
} from '@/lib/api/mandiPrices';

// Common Indian states for agriculture markets
const COMMON_STATES = [
  'Punjab',
  'Haryana',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Maharashtra',
  'Rajasthan',
  'Gujarat',
  'Bihar',
  'West Bengal',
  'Karnataka',
  'Andhra Pradesh',
  'Telangana',
  'Tamil Nadu',
  'Kerala',
  'Odisha',
  'Chhattisgarh',
  'Jharkhand',
  'Uttarakhand',
  'Himachal Pradesh',
  'Assam'
];

// Common commodities
const COMMON_COMMODITIES = [
  'Wheat',
  'Rice',
  'Maize',
  'Bajra',
  'Jowar',
  'Cotton',
  'Soyabean',
  'Groundnut',
  'Mustard',
  'Sunflower',
  'Gram',
  'Masur',
  'Moong',
  'Urad',
  'Arhar',
  'Potato',
  'Onion',
  'Tomato',
  'Cauliflower',
  'Cabbage'
];

export function MandiPrices() {
  const [prices, setPrices] = useState<MandiPriceRecord[]>([]);
  const [states, setStates] = useState<string[]>(COMMON_STATES);
  const [districts, setDistricts] = useState<string[]>([]);
  const [commodities, setCommodities] = useState<string[]>(COMMON_COMMODITIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Load prices when user clicks search
  const handleSearch = async () => {
    if (!selectedState) {
      setError('Please select a state to view prices');
      return;
    }
    await loadPrices();
  };

  // Load districts when state changes
  useEffect(() => {
    if (selectedState) {
      loadDistricts(selectedState);
    } else {
      setDistricts([]);
      setSelectedDistrict('');
    }
  }, [selectedState]);

  const loadDistricts = async (state: string) => {
    try {
      const districtsData = await getDistricts(state);
      setDistricts(districtsData);
    } catch (err) {
      console.error('Error loading districts:', err);
    }
  };

  const loadPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMandiPrices({
        state: selectedState || undefined,
        district: selectedDistrict || undefined,
        commodity: selectedCommodity || undefined,
        limit: 50,
      });
      
      console.log('Loaded prices:', data.length, 'records');
      
      if (data.length === 0) {
        setError('No price data available for the selected filters. Try different criteria.');
      } else {
        setPrices(data);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load prices';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Filter prices by search term
  const filteredPrices = prices.filter(price => 
    price.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
    price.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    price.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border-emerald-100">
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <TrendingUp className="mr-2 h-5 w-5" />
          Live Mandi Prices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Required Field Notice */}
        <div className="flex items-center gap-2 text-sm text-sage-600">
          <AlertCircle className="h-4 w-4" />
          <span>Select a state to view live mandi prices</span>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* State Filter - Required */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-emerald-700">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setError(null);
              }}
              className="flex h-10 w-full rounded-md border border-emerald-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-sage-600">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className="flex h-10 w-full rounded-md border border-emerald-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:opacity-50"
            >
              <option value="">All Districts</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* Commodity Filter */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-sage-600">Commodity</label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="flex h-10 w-full rounded-md border border-emerald-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <option value="">All Commodities</option>
              {commodities.map(commodity => (
                <option key={commodity} value={commodity}>{commodity}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-sage-600">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-sage-500" />
              <Input
                placeholder="Search market..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-emerald-200"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-sage-600">&nbsp;</label>
            <Button 
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search Prices'}
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
            <span className="ml-2 text-sage-600">Loading prices...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">{error}</p>
            <Button 
              onClick={loadPrices} 
              variant="outline" 
              className="mt-2 border-red-300 text-red-600 hover:bg-red-50"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Prices Table */}
        {!loading && !error && filteredPrices.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-emerald-800">Location</th>
                  <th className="px-3 py-2 text-left font-semibold text-emerald-800">Commodity</th>
                  <th className="px-3 py-2 text-left font-semibold text-emerald-800">Variety</th>
                  <th className="px-3 py-2 text-right font-semibold text-emerald-800">Min</th>
                  <th className="px-3 py-2 text-right font-semibold text-emerald-800">Max</th>
                  <th className="px-3 py-2 text-right font-semibold text-emerald-800">Modal</th>
                  <th className="px-3 py-2 text-left font-semibold text-emerald-800">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {filteredPrices.slice(0, 10).map((price, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/50">
                    <td className="px-3 py-2">
                      <div className="flex items-start gap-1">
                        <MapPin className="h-3 w-3 text-sage-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-forest-800">{price.market}</p>
                          <p className="text-xs text-sage-600">{price.district}, {price.state}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 font-medium text-emerald-800">{price.commodity}</td>
                    <td className="px-3 py-2 text-sage-600">{price.variety}</td>
                    <td className="px-3 py-2 text-right text-sage-600">{formatPrice(price.min_price)}</td>
                    <td className="px-3 py-2 text-right text-sage-600">{formatPrice(price.max_price)}</td>
                    <td className="px-3 py-2 text-right font-bold text-emerald-700">{formatPrice(price.modal_price)}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1 text-xs text-sage-600">
                        <Calendar className="h-3 w-3" />
                        {price.arrival_date}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPrices.length > 10 && (
              <p className="text-center text-xs text-sage-500 mt-2">
                Showing 10 of {filteredPrices.length} records
              </p>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredPrices.length === 0 && (
          <div className="text-center py-8">
            <Filter className="h-12 w-12 text-emerald-300 mx-auto mb-3" />
            <p className="text-sage-600">No prices found for the selected filters.</p>
            <Button 
              onClick={() => {
                setSelectedState('');
                setSelectedDistrict('');
                setSelectedCommodity('');
                setSearchTerm('');
              }} 
              variant="outline" 
              className="mt-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
