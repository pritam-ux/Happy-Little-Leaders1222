const router = require('express').Router();
const Announcement = require('../models/Announcement');
const { requireAuth, requireRole } = require('../middleware/auth');

router.get('/', requireAuth, async (req, res) => {
  const audienceFilter =
    req.user.role === 'admin'
      ? {}
      : { audience: { $in: ['all', req.user.role === 'parent' ? 'parents' : 'teachers'] } };
  const items = await Announcement.find(audienceFilter).sort({ createdAt: -1 }).limit(50);
  res.json(items);
});

router.post('/', requireAuth, requireRole('teacher', 'admin'), async (req, res) => {
  const { title, body, audience } = req.body;
  if (!title || !body) return res.status(400).json({ message: 'title and body required' });
  const item = await Announcement.create({
    title,
    body,
    audience: audience || 'all',
    postedBy: req.user._id,
  });
  res.status(201).json(item);
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
