const mongoose = require('mongoose');
const Flight = require('./models/Flight');

mongoose.connect('mongodb://127.0.0.1:27017/flightbooking');

const mockFlights = [
  {
    segments: [
      {
        airline: 'IndiGo',
        airlineCode: '6E',
        flightNumber: '6E-8339',
        departureTime: '13:40',
        arrivalTime: '15:10',
        departureAirport: 'CCU',
        arrivalAirport: 'DMU',
        duration: '1h 30m'
      }
    ],
    price: 11681,
    totalDuration: '1h 30m',
    stops: 0,
    tags: ['Best', 'Cheapest', 'Fastest'],
    flightDate: '2026-04-08'
  },
  {
    segments: [
      {
        airline: 'IndiGo',
        airlineCode: '6E',
        flightNumber: '6E-454',
        departureTime: '06:05',
        arrivalTime: '07:35',
        departureAirport: 'CCU',
        arrivalAirport: 'GAU',
        duration: '1h 30m'
      },
      {
        airline: 'IndiGo',
        airlineCode: '6E',
        flightNumber: '6E-202',
        departureTime: '10:45',
        arrivalTime: '11:30',
        departureAirport: 'GAU',
        arrivalAirport: 'DMU',
        duration: '0h 45m'
      }
    ],
    price: 17765,
    totalDuration: '5h 25m',
    stops: 1,
    layovers: ['GAU'],
    flightDate: '2026-04-08'
  },
  {
    segments: [
      {
        airline: 'Air India Express',
        airlineCode: 'IX',
        flightNumber: 'IX-332',
        departureTime: '07:20',
        arrivalTime: '08:50',
        departureAirport: 'CCU',
        arrivalAirport: 'GAU',
        duration: '1h 30m'
      },
      {
        airline: 'Air India Express',
        airlineCode: 'IX',
        flightNumber: 'IX-114',
        departureTime: '13:10',
        arrivalTime: '14:00',
        departureAirport: 'GAU',
        arrivalAirport: 'DMU',
        duration: '0h 50m'
      }
    ],
    price: 17191,
    totalDuration: '6h 40m',
    stops: 1,
    layovers: ['GAU'],
    flightDate: '2026-04-08'
  },
  {
    segments: [
      {
        airline: 'Air India',
        airlineCode: 'AI',
        flightNumber: 'AI-201',
        departureTime: '21:00',
        arrivalTime: '23:30',
        departureAirport: 'CCU',
        arrivalAirport: 'DEL',
        duration: '2h 30m'
      },
      {
        airline: 'Air India',
        airlineCode: 'AI',
        flightNumber: 'AI-848',
        departureTime: '11:00',
        arrivalTime: '14:00',
        departureAirport: 'DEL',
        arrivalAirport: 'DMU',
        duration: '3h 00m'
      }
    ],
    price: 19743,
    totalDuration: '17h 00m',
    stops: 1,
    layovers: ['DEL'],
    flightDate: '2026-04-08'
  }
];

const seedDB = async () => {
  await Flight.deleteMany({});
  await Flight.insertMany(mockFlights);
  console.log('Database seeded with flights');
  mongoose.connection.close();
};

seedDB();
