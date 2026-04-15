import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFlightStore } from '../store/useFlightStore';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

const liveProviders = [
  { id: 'makemytrip', name: 'MakeMyTrip', rating: 4.8, reviewCount: '1M+', variance: 0 },
  { id: 'goibibo', name: 'Goibibo', rating: 4.7, reviewCount: '800k+', variance: -50 },
  { id: 'paytm', name: 'Paytm Flights', rating: 4.6, reviewCount: '500k+', variance: -120 },
  { id: 'cleartrip', name: 'Cleartrip', rating: 4.7, reviewCount: '200k+', variance: 80 },
  { id: 'skyscanner', name: 'Skyscanner', rating: 4.7, reviewCount: '12k+', variance: 120 },
  { id: 'indigo', name: 'Airline Direct', rating: 4.5, reviewCount: '25k+', variance: 200 },
];

export const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { flightDetails, loading, fetchFlightDetails } = useFlightStore();

  useEffect(() => {
    if (id) {
      fetchFlightDetails(id);
    }
  }, [id, fetchFlightDetails]);

  const getProviderLink = (providerId: string, flight: any) => {
    const dept = flight.segments[0].departureAirport;
    const arr = flight.segments[flight.segments.length - 1].arrivalAirport;
    const rawDate = flight.flightDate || format(new Date(), 'yyyy-MM-dd'); 
    const [yyyy, m, d] = rawDate.split('-');
    
    // Ensure two-digit padding
    const year = yyyy;
    const month = m.padStart(2, '0');
    const day = d.padStart(2, '0');

    switch(providerId) {
      case 'makemytrip':
        return `https://www.makemytrip.com/flight/search?itinerary=${dept}-${arr}-${day}/${month}/${year}&tripType=O&paxType=A-1_C-0_I-0&intl=false&cabinClass=E`;
      case 'goibibo':
        return `https://www.goibibo.com/flights/flight-search/?vt=1&showval=&Date-${day}%2F${month}%2F${year}&Query=${dept}-${arr}-1-0-0-E`;
      case 'paytm':
        return `https://tickets.paytm.com/flights/flightSearch/${dept}/${arr}/1/0/0/E/${year}-${month}-${day}`;
      case 'cleartrip':
        return `https://www.cleartrip.com/flights/results?adults=1&childs=0&infants=0&class=Economy&depart_date=${day}/${month}/${year}&from=${dept}&to=${arr}`;
      case 'skyscanner':
        return `https://www.skyscanner.co.in/transport/flights/${dept.toLowerCase()}/${arr.toLowerCase()}/${year.slice(2)}${month}${day}/`;
      case 'indigo':
        return `https://www.goindigo.in/booking/flight-select.html?origin=${dept}&destination=${arr}&departDate=${day}%2F${month}%2F${year}&adults=1`;
      default:
        return `https://www.google.com/travel/flights?q=Flights%20to%20${arr}%20from%20${dept}%20on%20${year}-${month}-${day}`;
    }
  };

  const handleProviderClick = (providerName: string) => {
    if (flightDetails) {
      const outboundUrl = getProviderLink(providerName, flightDetails);
      window.open(outboundUrl, '_blank');
    }
  };

  if (loading || !flightDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-light">
        <svg className="w-8 h-8 animate-spin text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <span className="ml-2 font-medium">Loading itinerary...</span>
      </div>
    );
  }

  const flight = flightDetails;

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-4">
          <button onClick={() => navigate('/results')} className="flex items-center text-brand-blue font-medium hover:underline">
             <ArrowLeft className="w-4 h-4 mr-2" /> Back to flight results
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Your Itinerary</h2>
            <div className="space-y-6">
              {flight.segments.map((segment, idx) => (
                <div key={idx} className="relative pl-6 pb-6 last:pb-0 border-l-[2px] border-dashed border-gray-300 ml-4">
                  <div className="absolute w-3 h-3 bg-brand-blue rounded-full -left-[7px] top-1 border-2 border-white"></div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-blue-50 px-3 py-1 rounded text-brand-blue font-bold text-sm">
                      {segment.airlineCode} {segment.flightNumber}
                    </div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-4 mb-2">
                    <div className="font-bold text-xl">{segment.departureTime}</div>
                    <div>
                      <div className="font-bold text-gray-900">{segment.departureAirport} Airport</div>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm py-3 border-l-[2px] border-brand-blue border-solid ml-[-25px] pl-[23px] my-2">
                    Duration: {segment.duration}
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-4">
                    <div className="font-bold text-xl">{segment.arrivalTime}</div>
                    <div>
                      <div className="font-bold text-gray-900">{segment.arrivalAirport} Airport</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Compare Prices & Book</h2>
            <p className="text-sm text-gray-500 mb-6">Select a provider below to securely book this flight directly on their website.</p>
            <div className="space-y-4">
              {liveProviders.map((provider) => {
                // Calculate realistic live provider price based on actual flight price offset
                const livePrice = flight.price + provider.variance;
                
                return (
                  <div 
                    key={provider.id}
                    onClick={() => handleProviderClick(provider.id)}
                    className="border border-gray-200 hover:border-brand-blue hover:shadow-md rounded-lg p-5 cursor-pointer transition-all group bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-blue transition-colors">{provider.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">{provider.rating} ★</span>
                           <span className="text-xs text-gray-500">{provider.reviewCount} reviews</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors">₹{livePrice.toLocaleString('en-IN')}</div>
                        <div className="text-sm font-bold text-brand-blue flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          View Deal <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
