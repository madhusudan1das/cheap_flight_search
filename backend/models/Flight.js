const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
  airline: String,
  airlineCode: String,
  flightNumber: String,
  departureTime: String,
  arrivalTime: String,
  departureAirport: String,
  arrivalAirport: String,
  duration: String
});

const flightSchema = new mongoose.Schema({
  segments: [segmentSchema],
  price: Number,
  totalDuration: String,
  stops: Number,
  tags: [String],
  layovers: [String],
  flightDate: String // YYYY-MM-DD
});

module.exports = mongoose.model('Flight', flightSchema);
