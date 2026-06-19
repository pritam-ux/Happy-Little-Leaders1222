const router = require('express').Router();
const Visit = require('../models/Visit');
const { requireAuth, requireRole } = require('../middleware/auth');

router.post('/', async (req, res) => {
  const { name, phone, preferredDate, branch, notes } = req.body;
  if (!name || !phone || !preferredDate || !branch) {
    return res.status(400).json({ message: 'name, phone, preferredDate and branch required' });
  }
  const item = await Visit.create({ name, phone, preferredDate, branch, notes });
  res.status(201).json({ ok: true, id: item._id });
});

router.get('/', requireAuth, requireRole('admin'), async (_req, res) => {
  const items = await Visit.find().sort({ createdAt: -1 }).limit(200);
  res.json(items);
});

module.exports = router;
