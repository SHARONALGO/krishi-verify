import { NextRequest, NextResponse } from 'next/server';

const API_KEY = '579b464db66ec23bdd000001f6303db3e4f4451b5adf75fd9b6e8e42';
const BASE_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const commodity = searchParams.get('commodity');
    
    // Build API URL with params
    const apiParams = new URLSearchParams({
      'api-key': API_KEY,
      'format': 'json',
      'limit': '10',
    });
    
    if (commodity) {
      apiParams.append('filters[commodity]', commodity);
    }
    
    const url = `${BASE_URL}?${apiParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
        'User-Agent': 'KRISHI-VERIFY/1.0'
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API Error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error fetching mandi prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
