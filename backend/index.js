const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// ✅ Enable CORS for all origins (e.g., localhost:3000)
app.use(cors());

// ✅ Parse JSON body
app.use(bodyParser.json());

// ✅ Load libraries.json on startup
let libraries = [];
const dataPath = path.join(__dirname, 'libraries.json');

try {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  libraries = JSON.parse(rawData);
  console.log("✅ Loaded libraries:", libraries.length);
  console.log("📦 Sample entry:", libraries[0]);
} catch (error) {
  console.error("❌ Failed to read libraries.json:", error.message);
}

// ✅ GET all libraries
app.get('/api/libraries', (req, res) => {
  console.log("📥 GET /api/libraries called");
  res.json(libraries);
});

// ✅ Dummy user storage
const users = [];

// ✅ Register user
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' });

  const exists = users.find(user => user.username === username);
  if (exists)
    return res.status(400).json({ message: 'User already exists' });

  users.push({ username, password });
  console.log(`✅ Registered user: ${username}`);
  res.json({ message: 'Registration successful' });
});

// ✅ Login user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const found = users.find(user => user.username === username && user.password === password);

  if (!found)
    return res.status(401).json({ message: 'Invalid credentials' });

  console.log(`✅ Logged in: ${username}`);
  res.json({ message: 'Login successful' });
});

// ✅ Start backend server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
