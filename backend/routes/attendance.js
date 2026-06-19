const router = require('express').Router();
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const { requireAuth, requireRole } = require('../middleware/auth');

router.get('/', requireAuth, async (req, res) => {
  const filter = {};
  if (req.user.role === 'parent') {
    const child = await User.findOne({ _id: req.query.studentId, role: 'parent' });
    filter.studentId = child ? child._id : req.user._id;
  } else if (req.query.studentId) {
    filter.studentId = req.query.studentId;
  }
  if (req.query.classroom) filter.classroom = req.query.classroom;
  const records = await Attendance.find(filter).sort({ date: -1 }).limit(60);
  res.json(records);
});

router.post('/', requireAuth, requireRole('teacher', 'admin'), async (req, res) => {
  const { studentId, date, status, classroom, note } = req.body;
  if (!studentId || !date) return res.status(400).json({ message: 'studentId and date required' });
  const record = await Attendance.findOneAndUpdate(
    { studentId, date },
    { status, classroom, note, markedBy: req.user._id },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(201).json(record);
});

module.exports = router;
