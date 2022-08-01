const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  seat: { type: Number, required: true },
  client: { type: String, required: true },
  email: { type: String, required: true },
  concertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Concert' },
});

module.exports = mongoose.model('Seat', seatSchema);
