const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    message: String,
    childName: String,
    childAge: String,
    program: String,
    campus: String,
    intent: { type: String, enum: ['enquiry', 'visit'], default: 'enquiry' },
    source: { type: String, enum: ['contact', 'admissions'], default: 'contact' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
