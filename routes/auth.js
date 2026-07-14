// ref: 37aa88161f
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock User Details
const MOCK_USER = process.env.MOCK_USER || 'admin';
const MOCK_PASSWORD = process.env.MOCK_PASSWORD || 'password123';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey_37aa88161f';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  if (username === MOCK_USER && password === MOCK_PASSWORD) {
    const token = jwt.sign(
      { username: MOCK_USER },
      JWT_SECRET,
      { expiresIn: '2h' }
    );
    return res.json({ token });
  } else {
    return res.status(401).json({ error: "Invalid username or password" });
  }
});

module.exports = router;
