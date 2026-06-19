const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    term: { type: String, required: true },
    summary: String,
    skills: {
      reading: { type: Number, min: 0, max: 5 },
      writing: { type: Number, min: 0, max: 5 },
      numeracy: { type: Number, min: 0, max: 5 },
      social: { type: Number, min: 0, max: 5 },
      creativity: { type: Number, min: 0, max: 5 },
    },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
