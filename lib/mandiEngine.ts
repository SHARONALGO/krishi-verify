import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

// Types
export interface MandiRecord {
  State: string;
  District: string;
  Market: string;
  Commodity: string;
  Variety: string;
  Grade: string;
  Arrival_Date: string;
  'Min Price': string;
  'Max Price': string;
  'Modal Price': string;
}

export interface QueryResult {
  commodity: string;
  state: string;
  district: string;
  market: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  variety: string;
  grade: string;
}

// Multilingual Crop Dictionary
export const cropDictionary: Record<string, string[]> = {
  wheat: ['wheat', 'gehun', 'gehu', 'गेहूं', 'ਗੇਹੂੰ'],
  rice: ['rice', 'chawal', 'chaval', 'चावल', 'ਚੌਲ'],
  maize: ['maize', 'makka', 'makkha', 'मक्का', 'ਮੱਕੀ'],
  cotton: ['cotton', 'kapas', 'कपास', 'ਕਪਾਹ'],
  mustard: ['mustard', 'sarson', 'सरसों', 'ਸਰੋਂ'],
  soyabean: ['soyabean', 'soybean', 'soya', 'सोयाबीन', 'ਸੋਇਆਬੀਨ'],
  groundnut: ['groundnut', 'mungfali', 'moongphali', 'मूंगफली', 'ਮੂੰਗਫਲੀ'],
  barley: ['barley', 'jau', 'जौ', 'ਜੌਂ'],
  bajra: ['bajra', 'pearl millet', 'बाजरा', 'ਬਾਜਰਾ'],
  jowar: ['jowar', 'sorghum', 'ज्वार', 'ਜਵਾਰ'],
  urad: ['urad', 'black gram', 'उड़द', 'ਉੜਦ'],
  moong: ['moong', 'green gram', 'मूंग', 'ਮੂੰਗ'],
  tur: ['tur', 'pigeon pea', 'arhar', 'तूर', 'ਤੂਰ'],
  ragi: ['ragi', 'finger millet', 'nachni', 'रागी', 'ਰਾਗੀ'],
  potato: ['potato', 'aloo', 'aalu', 'आलू', 'ਆਲੂ'],
  onion: ['onion', 'pyaz', 'प्याज', 'ਪਿਆਜ਼'],
  tomato: ['tomato', 'tamatar', 'टमाटर', 'ਟਮਾਟਰ'],
  guar: ['guar', 'cluster bean', 'ग्वार', 'ਗੁਆਰ'],
  castor: ['castor', 'arandi', 'अरंडी', 'ਅਰੰਡੀ'],
  cumin: ['cumin', 'jeera', 'जीरा', 'ਜੀਰਾ'],
  chillies: ['chillies', 'chili', 'mirch', 'मिर्च', 'ਮਿਰਚ'],
  turmeric: ['turmeric', 'haldi', 'हल्दी', 'ਹਲਦੀ'],
  jute: ['jute', 'joot', 'जूट', 'ਜੂਟ'],
};

// Cache for dataset
let datasetCache: MandiRecord[] | null = null;
let datasetLoadPromise: Promise<MandiRecord[]> | null = null;

/**
 * Load dataset from CSV file
 * Cached in memory for performance
 */
export async function loadDataset(): Promise<MandiRecord[]> {
  // Return cached data if available
  if (datasetCache) {
    return datasetCache;
  }

  // Return existing promise if loading is in progress
  if (datasetLoadPromise) {
    return datasetLoadPromise;
  }

  // Load dataset
  datasetLoadPromise = new Promise((resolve, reject) => {
    const results: MandiRecord[] = [];
    const csvPath = path.join(process.cwd(), 'data', 'mandi_prices.csv');

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data: MandiRecord) => {
        results.push(data);
      })
      .on('end', () => {
        datasetCache = results;
        console.log(`[MandiEngine] Loaded ${results.length} records from dataset`);
        resolve(results);
      })
      .on('error', (error) => {
        console.error('[MandiEngine] Error loading dataset:', error);
        reject(error);
      });
  });

  return datasetLoadPromise;
}

/**
 * Get all unique commodities from dataset
 */
export async function getAllCommodities(): Promise<string[]> {
  const dataset = await loadDataset();
  const commodities = new Set(dataset.map(record => record.Commodity.toLowerCase()));
  return Array.from(commodities).sort();
}

/**
 * Detect language from text
 * Returns: 'hi' | 'pa' | 'en'
 */
export function detectLanguage(text: string): 'hi' | 'pa' | 'en' {
  // Hindi Unicode range: \u0900-\u097F
  const hindiRegex = /[\u0900-\u097F]/;
  
  // Punjabi/Gurmukhi Unicode range: \u0A00-\u0A7F
  const punjabiRegex = /[\u0A00-\u0A7F]/;
  
  if (punjabiRegex.test(text)) {
    return 'pa';
  }
  
  if (hindiRegex.test(text)) {
    return 'hi';
  }
  
  return 'en';
}

/**
 * Detect commodity from question using dictionary
 */
export function detectCommodity(question: string): string | null {
  const lowerQuestion = question.toLowerCase().trim();
  
  for (const [canonicalName, variants] of Object.entries(cropDictionary)) {
    for (const variant of variants) {
      // Check for exact match or word boundary match
      const regex = new RegExp(`\\b${variant}\\b`, 'i');
      if (regex.test(lowerQuestion) || lowerQuestion.includes(variant.toLowerCase())) {
        return canonicalName;
      }
    }
  }
  
  return null;
}

/**
 * Query dataset for commodity price
 */
export async function queryCommodity(commodity: string): Promise<QueryResult | null> {
  const dataset = await loadDataset();
  
  // Find first matching record (case-insensitive)
  const record = dataset.find(
    r => r.Commodity.toLowerCase() === commodity.toLowerCase()
  );
  
  if (!record) {
    return null;
  }
  
  return {
    commodity: record.Commodity,
    state: record.State,
    district: record.District,
    market: record.Market,
    modalPrice: parseInt(record['Modal Price'], 10) || 0,
    minPrice: parseInt(record['Min Price'], 10) || 0,
    maxPrice: parseInt(record['Max Price'], 10) || 0,
    variety: record.Variety,
    grade: record.Grade,
  };
}

/**
 * Generate response in detected language
 */
export function generateResponse(language: 'hi' | 'pa' | 'en', result: QueryResult): string {
  const { commodity, district, market, modalPrice, minPrice, maxPrice } = result;
  
  switch (language) {
    case 'hi':
      return `${district} मंडी (${market}) में ${commodity} का न्यूनतम भाव ₹${minPrice}, अधिकतम भाव ₹${maxPrice}, और मॉडल भाव ₹${modalPrice} प्रति क्विंटल है।`;
    
    case 'pa':
      return `${district} ਮੰਡੀ (${market}) ਵਿੱਚ ${commodity} ਦਾ ਘੱਟੋ-ਘੱਟ ਰੇਟ ₹${minPrice}, ਵੱਧ ਤੋਂ ਵੱਧ ਰੇਟ ₹${maxPrice}, ਅਤੇ ਮਾਡਲ ਰੇਟ ₹${modalPrice} ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹੈ।`;
    
    case 'en':
    default:
      return `The price of ${commodity} in ${district} mandi (${market}) is: Minimum ₹${minPrice}, Maximum ₹${maxPrice}, and Modal ₹${modalPrice} per quintal.`;
  }
}

/**
 * Generate error response when commodity not found
 */
export function generateErrorResponse(language: 'hi' | 'pa' | 'en'): string {
  switch (language) {
    case 'hi':
      return 'माफ़ कीजिए, इस फसल का भाव हमारे डेटाबेस में नहीं मिला। कृपया गेहूं, चावल, मक्का, कपास, या सरसों जैसी फसल पूछें।';
    
    case 'pa':
      return 'ਮਾਫ਼ ਕਰਨਾ, ਇਸ ਫਸਲ ਦਾ ਰੇਟ ਸਾਡੇ ਡੇਟਾਬੇਸ ਵਿੱਚ ਨਹੀਂ ਮਿਲਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਗੇਹੂੰ, ਚੌਲ, ਮੱਕੀ, ਕਪਾਹ, ਜਾਂ ਸਰੋਂ ਵਰਗੀ ਫਸਲ ਪੁੱਛੋ।';
    
    case 'en':
    default:
      return 'Sorry, I could not find the price for this crop in our database. Please ask about wheat, rice, maize, cotton, or mustard.';
  }
}

/**
 * Process a farmer's question and return answer
 * Main entry point for chatbot
 */
export async function processQuestion(question: string): Promise<{
  answer: string;
  language: 'hi' | 'pa' | 'en';
  commodity: string | null;
  result: QueryResult | null;
}> {
  // Step 1: Detect language
  const language = detectLanguage(question);
  
  // Step 2: Detect commodity
  const commodity = detectCommodity(question);
  
  // Step 3: If no commodity found, return error
  if (!commodity) {
    return {
      answer: generateErrorResponse(language),
      language,
      commodity: null,
      result: null,
    };
  }
  
  // Step 4: Query dataset
  const result = await queryCommodity(commodity);
  
  // Step 5: If no result found, return error
  if (!result) {
    return {
      answer: generateErrorResponse(language),
      language,
      commodity,
      result: null,
    };
  }
  
  // Step 6: Generate response
  const answer = generateResponse(language, result);
  
  return {
    answer,
    language,
    commodity,
    result,
  };
}
