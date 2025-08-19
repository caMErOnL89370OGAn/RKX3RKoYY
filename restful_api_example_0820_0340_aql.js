// 代码生成时间: 2025-08-20 03:40:57
// Import necessary modules
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data for demonstration purposes
const users = [
# TODO: 优化性能
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

// GET endpoint to fetch all users
# TODO: 优化性能
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// GET endpoint to fetch a user by ID
# NOTE: 重要实现细节
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
# 扩展功能模块
  }
});

// POST endpoint to create a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT endpoint to update a user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    user.name = req.body.name;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE endpoint to delete a user
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
# 添加错误处理
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
# 改进用户体验
});

// Start the server
# 改进用户体验
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
# 添加错误处理