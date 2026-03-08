'use client';

import { useState } from 'react';
import { Calculator, Sprout, Weight, Droplets, TrendingUp, RefreshCcw, MapPin, Building2, Landmark, Ruler, ShieldCheck, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { calculateMSPWithBreakdown, formatCurrency, MSP_RATES_2025_27 } from '@/lib/utils';
import { 
  calculateQuality, 
  calculateQualityPrice, 
  fetchCommodityPrice,
  getGradeColor,
  type QualityResult,
  type CommodityPriceData 
} from '@/lib/api/mandiPrices';

export default function FarmerCalculatorPage() {
  // Location States
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [market, setMarket] = useState('');
  
  // Crop States
  const [cropType, setCropType] = useState('');
  const [weight, setWeight] = useState('');
  const [moisture, setMoisture] = useState('');
  const [grainSize, setGrainSize] = useState('');
  const [purityPercentage, setPurityPercentage] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [mspBreakdown, setMspBreakdown] = useState<ReturnType<typeof calculateMSPWithBreakdown> | null>(null);
  const [commodityData, setCommodityData] = useState<CommodityPriceData | null>(null);
  const [qualityResult, setQualityResult] = useState<QualityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Updated crop options with official 2025-27 MSP rates
  const cropOptions = [
    { name: 'Wheat', rate: 2585 },
    { name: 'Paddy', rate: 2369 },
    { name: 'Maize', rate: 2400 },
    { name: 'Moong', rate: 8768 },
    { name: 'Mustard', rate: 6200 },
    { name: 'Soyabean', rate: 5328 },
    // Additional crops with fallback rates
    { name: 'Bajra', rate: 2150 },
    { name: 'Jowar', rate: 2920 },
    { name: 'Ragi', rate: 3390 },
    { name: 'Cotton', rate: 6020 },
    { name: 'Groundnut', rate: 5650 },
  ];

  // Indian States and Districts from API data only
  const stateDistricts: Record<string, string[]> = {
    'Andhra Pradesh': ['Annamayya', 'Chittor', 'East Godavari'],
    'Assam': ['Nagaon'],
    'Gujarat': ['Chhota Udaipur', 'Junagarh', 'Mehsana', 'Rajkot', 'Surat', 'Vadodara(Baroda)', 'Valsad'],
    'Haryana': ['Gurgaon', 'Hissar', 'Jhajar', 'Kaithal', 'Mahendragarh-Narnaul', 'Mewat', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Yamuna Nagar'],
    'Himachal Pradesh': ['Hamirpur', 'Kangra', 'Mandi', 'Solan', 'Una'],
    'Kerala': ['Alappuzha', 'Ernakulam', 'Kannur', 'Kottayam', 'Kozhikode(Calicut)', 'Malappuram', 'Palakad', 'Thiruvananthapuram'],
    'Madhya Pradesh': ['Badwani', 'Jabalpur', 'Sheopur'],
    'Odisha': ['Boudh', 'Cuttack', 'Dhenkanal', 'Mayurbhanja', 'Rayagada', 'Sambalpur', 'Sundergarh'],
    'Punjab': ['Bhatinda', 'Faridkot', 'Fazilka', 'Ferozpur', 'Hoshiarpur', 'Jalandhar', 'Ludhiana', 'Moga', 'Mohali', 'Muktsar', 'Ropar (Rupnagar)', 'Sangrur'],
    'Rajasthan': ['Ajmer', 'Beawar', 'Bikaner', 'Deeg', 'Ganganagar', 'Hanumangarh', 'Jodhpur', 'Kota', 'Rajsamand'],
    'Tamil Nadu': ['Ariyalur', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Erode', 'Kancheepuram', 'Karur', 'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Salem', 'Sivaganga', 'Thanjavur', 'The Nilgiris', 'Theni', 'Thirunelveli', 'Thiruvannamalai', 'Thiruvarur', 'Vellore', 'Villupuram'],
    'Telangana': ['Mahbubnagar'],
    'Tripura': ['Gomati', 'Sepahijala', 'South Tripura'],
    'Uttar Pradesh': ['Badaun', 'Bahraich', 'Balrampur', 'Etah', 'Farukhabad', 'Fatehpur', 'Jalaun (Orai)', 'Khiri (Lakhimpur)', 'Maharajganj', 'Raebarelli', 'Shamli', 'Sitapur'],
    'Uttarakhand': ['Haridwar', 'Nanital', 'Udhamsinghnagar'],
    'West Bengal': ['Birbhum', 'Darjeeling', 'Jhargram', 'Medinipur(E)']
  };

  const states = Object.keys(stateDistricts).sort();

  // Get districts based on selected state
  const getDistricts = () => {
    return state ? stateDistricts[state] || [] : [];
  };

  const handleCalculate = async () => {
    if (!state || !market || !cropType || !weight || !moisture || !grainSize || !purityPercentage) return;
    
    setIsCalculating(true);
    
    // Fetch commodity price data from API
    const priceData = await fetchCommodityPrice(cropType);
    setCommodityData(priceData);
    
    // Use API modal price or fallback
    const basePrice = priceData?.modalPrice || 5000;
    
    // Calculate quality score
    const quality = calculateQuality({
      grainSize: parseFloat(grainSize),
      purityPercentage: parseFloat(purityPercentage),
      weight: parseFloat(weight),
      moisture: parseFloat(moisture),
    });
    setQualityResult(quality);
    
    // Calculate final price based on quality
    const finalPrice = calculateQualityPrice(basePrice, quality.qualityScore);
    setEstimatedPrice(finalPrice);
    
    // Calculate detailed MSP breakdown with moisture deduction
    const breakdown = calculateMSPWithBreakdown(
      cropType,
      parseFloat(weight),
      parseFloat(moisture),
      quality.qualityScore
    );
    setMspBreakdown(breakdown);
    
    setIsCalculating(false);
  };

  const handleReset = () => {
    setState('');
    setDistrict('');
    setMarket('');
    setCropType('');
    setWeight('');
    setMoisture('');
    setGrainSize('');
    setPurityPercentage('');
    setCommodityData(null);
    setQualityResult(null);
    setEstimatedPrice(null);
    setMspBreakdown(null);
  };

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-2">MSP What-If Calculator</h1>
        <p className="text-forest-700">Estimate your expected fair price before visiting the mandi</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Input Form */}
        <Card className="border-emerald-100 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-800">
              <Sprout className="mr-2 h-5 w-5" />
              Crop Details
            </CardTitle>
            <CardDescription>
              Enter your location and crop data for price estimation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Location Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-emerald-700">State *</label>
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      setDistrict(''); // Reset district when state changes
                    }}
                    className="flex h-9 w-full rounded-md border border-emerald-200 bg-white pl-9 pr-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    <option value="">Select State...</option>
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-emerald-700">District *</label>
                <div className="relative">
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={!state}
                    className="flex h-9 w-full rounded-md border border-emerald-200 bg-white pl-9 pr-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:bg-slate-100 disabled:text-slate-500"
                  >
                    <option value="">{state ? 'Select District...' : 'Select State First'}</option>
                    {getDistricts().map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600 pointer-events-none" />
                </div>
              </div>

              <div className="col-span-full space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Mandi / Market Name *</label>
                <div className="relative">
                  <select
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    disabled={!district}
                    className="flex h-9 w-full rounded-md border border-emerald-200 bg-white pl-9 pr-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:bg-slate-100 disabled:text-slate-500"
                  >
                    <option value="">{district ? 'Select Mandi...' : 'Select District First'}</option>
                    <option value={`${district} Main Mandi`}>{district} Main Mandi</option>
                    <option value={`${district} Sub Mandi`}>{district} Sub Mandi</option>
                    <option value={`${district} Krishi Mandi`}>{district} Krishi Mandi</option>
                    <option value={`${district} APMC`}>{district} APMC</option>
                    <option value="other">Other Mandi</option>
                  </select>
                  <Landmark className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Crop Data Section */}
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-700">Crop Type</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-emerald-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  <option value="">Select crop...</option>
                  {cropOptions.map((crop) => (
                    <option key={crop.name} value={crop.name.toLowerCase()}>
                      {crop.name} (₹{crop.rate}/q)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-700">Weight (kg)</label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter expected weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="pl-10 border-emerald-200"
                  />
                  <Weight className="absolute left-3 top-3 h-4 w-4 text-sage-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-700 flex items-center gap-2">
                  Moisture Content (%)
                  <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">New</span>
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="30"
                    placeholder="Enter moisture %"
                    value={moisture}
                    onChange={(e) => setMoisture(e.target.value)}
                    className="pl-10 border-emerald-200"
                  />
                  <Droplets className="absolute left-3 top-3 h-4 w-4 text-sage-500" />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-sage-600 italic">Standard: 14% (0.75% deduction per 1% excess)</p>
                </div>
                {/* Moisture Slider */}
                <input
                  type="range"
                  min="10"
                  max="25"
                  step="0.5"
                  value={moisture || 14}
                  onChange={(e) => setMoisture(e.target.value)}
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-sage-500">
                  <span>10%</span>
                  <span className="font-medium text-emerald-600">14% (Standard)</span>
                  <span>25%</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-700">Grain Size (mm)</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Enter grain size"
                    value={grainSize}
                    onChange={(e) => setGrainSize(e.target.value)}
                    className="pl-10 border-emerald-200"
                  />
                  <Ruler className="absolute left-3 top-3 h-4 w-4 text-sage-500" />
                </div>
                <p className="text-[10px] text-sage-600 italic">Average grain diameter in millimeters</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-700">Purity Percentage (%)</label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Enter purity %"
                    value={purityPercentage}
                    onChange={(e) => setPurityPercentage(e.target.value)}
                    className="pl-10 border-emerald-200"
                  />
                  <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-sage-500" />
                </div>
                <p className="text-[10px] text-sage-600 italic">Percentage of pure grain without impurities</p>
              </div>
            </div>

            <Button 
              onClick={handleCalculate} 
              disabled={!state || !market || !cropType || !weight || !moisture || !grainSize || !purityPercentage || isCalculating}
              className="w-full bg-emerald-700 hover:bg-emerald-800 transition-colors"
            >
              {isCalculating ? (
                <>
                  <TrendingUp className="mr-2 h-4 w-4 animate-pulse" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Estimated MSP
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Right Column - Results */}
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-800">
              <TrendingUp className="mr-2 h-5 w-5" />
              What-If Results
            </CardTitle>
            <CardDescription>
              Estimated payout for {market || 'selected mandi'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Location Summary Badge */}
            <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-md border border-emerald-100 text-emerald-700 text-xs">
              <MapPin className="h-3 w-3" />
              <span className="font-medium">
                {state ? `${state} > ${district || '-'} > ${market}` : 'Location not set'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-100">
                <p className="text-xs text-sage-700 mb-1">Crop Variety</p>
                <p className="text-lg font-semibold text-emerald-800 capitalize">
                  {cropType || '-'}
                </p>
              </div>
              <div className="rounded-lg bg-sage-50 p-4 border border-sage-100">
                <p className="text-xs text-sage-700 mb-1">Net Weight</p>
                <p className="text-lg font-semibold text-forest-800">
                  {weight ? `${weight} kg` : '-'}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-100">
                <p className="text-xs text-sage-700 mb-1">Grain Size</p>
                <p className="text-lg font-semibold text-emerald-800">
                  {grainSize ? `${grainSize} mm` : '-'}
                </p>
              </div>
              <div className="rounded-lg bg-sage-50 p-4 border border-sage-100">
                <p className="text-xs text-sage-700 mb-1">Purity</p>
                <p className="text-lg font-semibold text-forest-800">
                  {purityPercentage ? `${purityPercentage}%` : '-'}
                </p>
              </div>
            </div>

            {estimatedPrice !== null && qualityResult ? (
              <div className="space-y-4">
                {/* Grade Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-sage-700">Crop Grade</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(qualityResult.grade)}`}>
                    Grade {qualityResult.grade}
                  </span>
                </div>

                {/* Quality Score */}
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Quality Score</span>
                    <span className="text-lg font-bold text-slate-800">
                      {(qualityResult.qualityScore * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${qualityResult.qualityScore * 100}%` }}
                    />
                  </div>
                </div>

                {/* API Price Data */}
                {commodityData && (
                  <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-3">
                      Live Mandi Prices (API)
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center">
                        <p className="text-[10px] text-blue-600 mb-1">Min Price</p>
                        <p className="text-sm font-bold text-blue-800">{formatCurrency(commodityData.minPrice)}</p>
                      </div>
                      <div className="text-center bg-white rounded p-2">
                        <p className="text-[10px] text-emerald-600 mb-1">Modal Price</p>
                        <p className="text-lg font-bold text-emerald-700">{formatCurrency(commodityData.modalPrice)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-blue-600 mb-1">Max Price</p>
                        <p className="text-sm font-bold text-blue-800">{formatCurrency(commodityData.maxPrice)}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-blue-200 flex justify-between text-xs">
                      <span className="text-blue-600">Variety: <span className="font-medium">{commodityData.variety}</span></span>
                      <span className="text-blue-600">API Grade: <span className="font-medium">{commodityData.grade}</span></span>
                    </div>
                  </div>
                )}

                {/* MSP Breakdown with Moisture Deduction */}
                {mspBreakdown && (
                  <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">
                      Price Breakdown (CCEA 2025-27)
                    </p>
                    
                    {/* Base Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Base Price ({mspBreakdown.weightInQuintals.toFixed(2)} q)</span>
                      <span className="text-base font-semibold text-slate-800">
                        ₹{mspBreakdown.basePrice} × {mspBreakdown.weightInQuintals.toFixed(2)}q
                      </span>
                    </div>
                    <div className="flex items-center justify-between pl-4 border-l-2 border-slate-200">
                      <span className="text-sm font-medium text-slate-700">Gross Amount</span>
                      <span className="text-lg font-semibold text-slate-800">
                        {formatCurrency(mspBreakdown.basePrice * mspBreakdown.weightInQuintals)}
                      </span>
                    </div>

                    {/* Moisture Deduction */}
                    {mspBreakdown.moistureDeductionPercentage > 0 && (
                      <div className="flex items-center justify-between text-red-600">
                        <span className="text-sm">Moisture Deduction ({mspBreakdown.moistureDeductionPercentage.toFixed(2)}%)</span>
                        <span className="text-base font-semibold">
                          -{formatCurrency(mspBreakdown.moistureDeductionAmount)}
                        </span>
                      </div>
                    )}

                    {/* Quality Adjustment */}
                    {mspBreakdown.qualityBonus > 0 && (
                      <div className="flex items-center justify-between text-emerald-600">
                        <span className="text-sm">Quality Bonus</span>
                        <span className="text-base font-semibold">
                          +{formatCurrency(mspBreakdown.qualityBonus)}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Final Payout */}
                <div className="rounded-lg border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-800">Final Payout</span>
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-5xl font-extrabold text-emerald-700 tracking-tight">
                    {mspBreakdown ? formatCurrency(mspBreakdown.finalPayout) : formatCurrency(estimatedPrice)}
                  </div>
                  <div className="mt-3 pt-3 border-t border-emerald-300/50 flex items-center gap-2">
                    <Info className="h-4 w-4 text-emerald-600" />
                    <p className="text-xs text-emerald-700">
                      Rates based on CCEA 2025-27 Marketing Season guidelines
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-emerald-200 bg-emerald-50/50 p-8 text-center">
                <Calculator className="h-12 w-12 text-emerald-300 mx-auto mb-3" />
                <p className="text-sm text-sage-600">
                  Fill in your crop details and click Calculate to see your estimated MSP
                </p>
              </div>
            )}

            <Button 
              onClick={handleReset}
              variant="outline"
              className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Clear and New Calculation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}