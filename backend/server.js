require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const announcementRoutes = require('./routes/announcements');
const reportRoutes = require('./routes/reports');
const inquiryRoutes = require('./routes/inquiries');
const visitRoutes = require('./routes/visits');
const newsletterRoutes = require('./routes/newsletter');
const userRoutes = require('./routes/users');

const User = require('./models/User');
const Announcement = require('./models/Announcement');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use('/api', apiLimiter);

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'happy-little-leaders' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/happy_little_leaders';

async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('MongoDB connected:', MONGO_URI);
    return 'external';
  } catch (err) {
    console.warn('Local MongoDB not available, starting in-memory MongoDB…');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mem = await MongoMemoryServer.create();
    await mongoose.connect(mem.getUri());
    console.log('In-memory MongoDB ready at', mem.getUri());
    return 'in-memory';
  }
}

async function seedDemoData() {
  const demoUsers = [
    { name: 'Admin User', email: 'admin@hll.com', password: 'admin123', role: 'admin' },
    { name: 'Teacher Priya', email: 'teacher@hll.com', password: 'teacher123', role: 'teacher', classroom: 'Nursery A' },
    { name: 'Parent Ravi', email: 'parent@hll.com', password: 'parent123', role: 'parent', childName: 'Aarav', classroom: 'Nursery A' },
  ];

  for (const u of demoUsers) {
    const exists = await User.findOne({ email: u.email });
    if (exists) continue;
    const passwordHash = await User.hashPassword(u.password);
    await User.create({ ...u, passwordHash });
    console.log(`Seeded ${u.role}: ${u.email} / ${u.password}`);
  }

  const annCount = await Announcement.countDocuments();
  if (annCount === 0) {
    await Announcement.create([
      { title: 'Welcome to the new term!', body: "Classes resume on Monday. Please pack your child's water bottle.", audience: 'all' },
      { title: 'Annual Day Practice', body: 'Practice sessions begin next week for our annual day performance.', audience: 'parents' },
    ]);
    console.log('Seeded sample announcements');
  }
}

(async () => {
  try {
    await connectMongo();
    await seedDemoData();
  } catch (err) {
    console.error('Database setup failed:', err.message);
  }
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
})();
