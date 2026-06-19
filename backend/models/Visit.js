const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    preferredDate: { type: String, required: true },
    branch: { type: String, enum: ['Chintalkunta', 'Vanasthalipuram'], required: true },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Visit', visitSchema);
