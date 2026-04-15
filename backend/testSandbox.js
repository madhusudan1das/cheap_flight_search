const axios = require('axios');
async function runTests() {
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: 'jbxrazu3GHOhGA13y73u33e7c1p0zGDR',
    client_secret: 'bIcJ2CYIGNPNF4zo'
  });
  const tokenRes = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', params);
  const token = tokenRes.data.access_token;

  const routes = [
    { origin: 'BOS', dest: 'NYC' },
    { origin: 'MAD', dest: 'BCN' },
    { origin: 'PAR', dest: 'LON' },
    { origin: 'LHR', dest: 'CDG' },
    { origin: 'DEL', dest: 'BOM' },
    { origin: 'BKK', dest: 'SYD' }
  ];

  const dates = [
    new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // 5 days
    new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0], // 30 days
  ];

  for (const route of routes) {
    for (const date of dates) {
      try {
        const res = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
          headers: { Authorization: `Bearer ${token}` },
          params: { originLocationCode: route.origin, destinationLocationCode: route.dest, departureDate: date, adults: 1 }
        });
        console.log(`SUCCESS! ${route.origin}->${route.dest} on ${date}. Found ${res.data.data.length} flights`);
      } catch (err) {
        console.log(`Failed ${route.origin}->${route.dest} on ${date} (Code: ${err.response?.status})`);
      }
    }
  }
}
runTests();
