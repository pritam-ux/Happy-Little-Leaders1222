require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Announcement = require('./models/Announcement');

(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/happy_little_leaders');

  const seed = [
    { name: 'Admin User', email: 'admin@hll.com', password: 'admin123', role: 'admin' },
    { name: 'Teacher Priya', email: 'teacher@hll.com', password: 'teacher123', role: 'teacher', classroom: 'Nursery A' },
    { name: 'Parent Ravi', email: 'parent@hll.com', password: 'parent123', role: 'parent', childName: 'Aarav', classroom: 'Nursery A' },
  ];

  for (const u of seed) {
    const exists = await User.findOne({ email: u.email });
    if (exists) continue;
    const passwordHash = await User.hashPassword(u.password);
    await User.create({ ...u, passwordHash });
    console.log(`Seeded ${u.role}: ${u.email} / ${u.password}`);
  }

  const annCount = await Announcement.countDocuments();
  if (annCount === 0) {
    await Announcement.create([
      { title: 'Welcome to the new term!', body: 'Classes resume on Monday. Please pack your child\'s water bottle.', audience: 'all' },
      { title: 'Annual Day Practice', body: 'Practice sessions begin next week for our annual day performance.', audience: 'parents' },
    ]);
    console.log('Seeded announcements');
  }

  await mongoose.disconnect();
  console.log('Done.');
})();
