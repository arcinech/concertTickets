const mongoose = require('mongoose');

const workshopSchema  = new mongoose.Schema({
  name: {type: String, required: true},
  concertId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Concert' },
});

module.exports = mongoose.model('Workshop', workshopSchema);