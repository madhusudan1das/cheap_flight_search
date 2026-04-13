const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  flightId: { type: String },
  fareType: String,
  totalPrice: Number,
  passengers: Number,
  status: { type: String, default: 'CONFIRMED' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
