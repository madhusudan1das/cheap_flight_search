const axios = require('axios');
async function test() {
  try {
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'jbxrazu3GHOhGA13y73u33e7c1p0zGDR',
      client_secret: 'bIcJ2CYIGNPNF4zo'
    });
    const tokenRes = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', params);
    const token = tokenRes.data.access_token;
    console.log("Token received.");
    
    const flightRes = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        originLocationCode: 'JFK',
        destinationLocationCode: 'LHR',
        departureDate: '2026-06-01',
        adults: 1,
        max: 2
      }
    });
    console.log("Flights received: ", flightRes.data.data.length);
    console.log(JSON.stringify(flightRes.data.data[0], null, 2));
  } catch (err) {
    console.error("Error from API:");
    console.error(err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
  }
}
test();
