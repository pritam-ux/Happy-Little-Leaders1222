const router = require('express').Router();
const Inquiry = require('../models/Inquiry');
const { requireAuth, requireRole } = require('../middleware/auth');

router.post('/', async (req, res) => {
  const { name, phone, email, message, childName, childAge, program, campus, intent, source } = req.body;
  if (!name || !phone) return res.status(400).json({ message: 'name and phone required' });
  const item = await Inquiry.create({ name, phone, email, message, childName, childAge, program, campus, intent, source });
  res.status(201).json({ ok: true, id: item._id });
});

router.get('/', requireAuth, requireRole('admin'), async (_req, res) => {
  const items = await Inquiry.find().sort({ createdAt: -1 }).limit(200);
  res.json(items);
});

module.exports = router;
