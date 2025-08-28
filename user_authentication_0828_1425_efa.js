// 代码生成时间: 2025-08-28 14:25:45
const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Express application setup
const app = express();
app.use(express.json());

// Dummy database (for demonstration purposes only)
const users = {};

// Helper function to generate a unique user id
function generateUserId() {
  return uuidv4();
}

// Helper function to hash the password using bcrypt
function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

// Helper function to compare the password with the hashed password
function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

// Register a new user with hashed password
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required',
    });
  }
  if (users[username]) {
    return res.status(409).json({
      message: 'Username already exists',
    });
  }
  const hashedPassword = await hashPassword(password);
  users[username] = {
    id: generateUserId(),
    hashedPassword,
  };
  return res.status(201).json({
    message: 'User registered successfully',
    username,
  });
});

// Authenticate a user and return a session token
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required',
    });
  }
  const user = users[username];
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  const isPasswordMatch = await comparePassword(password, user.hashedPassword);
  if (!isPasswordMatch) {
    return res.status(401).json({
      message: 'Invalid password',
    });
  }
  const sessionToken = uuidv4();
  return res.status(200).json({
    message: 'User authenticated successfully',
    sessionToken,
    username,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
