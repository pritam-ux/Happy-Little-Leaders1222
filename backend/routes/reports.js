const router = require('express').Router();
const Report = require('../models/Report');
const { requireAuth, requireRole } = require('../middleware/auth');

router.get('/', requireAuth, async (req, res) => {
  const filter = {};
  if (req.user.role === 'parent') {
    filter.studentId = req.user._id;
  } else if (req.query.studentId) {
    filter.studentId = req.query.studentId;
  }
  const items = await Report.find(filter).sort({ createdAt: -1 });
  res.json(items);
});

router.post('/', requireAuth, requireRole('teacher', 'admin'), async (req, res) => {
  const { studentId, term, summary, skills } = req.body;
  if (!studentId || !term) return res.status(400).json({ message: 'studentId and term required' });
  const item = await Report.create({
    studentId,
    term,
    summary,
    skills,
    teacherId: req.user._id,
  });
  res.status(201).json(item);
});

module.exports = router;
