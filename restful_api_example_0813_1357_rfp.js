// 代码生成时间: 2025-08-13 13:57:09
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express application
const app = express();

// Port number for the server
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
# 增强安全性
app.use(bodyParser.json());

// In-memory data store
let users = [];

// POST endpoint to create a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.email) {
    return res.status(400).send('Name and email are required.');
# NOTE: 重要实现细节
  }
  users.push(newUser);
  res.status(201).send(newUser);
});

// GET endpoint to retrieve all users
app.get('/users', (req, res) => {
  res.send(users);
});

// GET endpoint to retrieve a single user by id
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
# 扩展功能模块
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).send('User not found.');
  }
  res.send(user);
});

// PUT endpoint to update an existing user
app.put('/users/:id', (req, res) => {
# 增强安全性
  const userId = parseInt(req.params.id, 10);
# 扩展功能模块
  const user = users.find(u => u.id === userId);
# 添加错误处理
  if (!user) {
    return res.status(404).send('User not found.');
# 改进用户体验
  }
  Object.assign(user, req.body);
  res.send(user);
});

// DELETE endpoint to delete a user
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
# 改进用户体验
    return res.status(404).send('User not found.');
  }
# NOTE: 重要实现细节
  users.splice(userIndex, 1);
  res.send('User deleted.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});