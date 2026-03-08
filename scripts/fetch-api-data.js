// Fetch API data to extract available states and districts
const API_KEY = '579b464db66ec23bdd000001f6303db3e4f4451b5adf75fd9b6e8e42';
const BASE_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

async function fetchAPIData() {
  try {
    const url = `${BASE_URL}?api-key=${API_KEY}&format=json&limit=1000`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.records) {
      // Extract unique states and districts
      const states = new Set();
      const stateDistricts = {};
      
      data.records.forEach(record => {
        const state = record.State || record.state;
        const district = record.District || record.district;
        
        if (state) {
          states.add(state);
          
          if (!stateDistricts[state]) {
            stateDistricts[state] = new Set();
          }
          if (district) {
            stateDistricts[state].add(district);
          }
        }
      });
      
      console.log('=== STATES ===');
      console.log(JSON.stringify([...states].sort(), null, 2));
      
      console.log('\n=== STATE-DISTRICT MAPPING ===');
      const sortedMapping = {};
      [...states].sort().forEach(state => {
        sortedMapping[state] = [...stateDistricts[state]].sort();
      });
      console.log(JSON.stringify(sortedMapping, null, 2));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchAPIData();
