const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Template = require('./models/Template');
const Section = require('./models/Section');
const User = require('./models/User');

dotenv.config();
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Auth endpoints
app.post('/api/auth/signup', async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: 'User exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash });
  try {
    await user.save();
    console.log('User saved:', user);
    res.json({ success: true });
  } catch (err) {
    console.error('User save error:', err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Templates endpoints
app.get('/api/templates', async (req, res) => {
  const templates = await Template.find();
  res.json(templates);
});
app.post('/api/templates', async (req, res) => {
  const template = new Template(req.body);
  await template.save();
  res.json(template);
});

// Sections endpoints
app.get('/api/sections', async (req, res) => {
  const sections = await Section.find();
  res.json(sections);
});
app.post('/api/sections', async (req, res) => {
  const section = new Section(req.body);
  await section.save();
  res.json(section);
});

// Export endpoint (dummy)
app.post('/api/export', (req, res) => {
  res.json({ html: req.body.html, css: req.body.css });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
