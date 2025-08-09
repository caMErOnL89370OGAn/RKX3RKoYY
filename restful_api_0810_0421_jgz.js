// 代码生成时间: 2025-08-10 04:21:23
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store for demonstration purposes.
const items = [];

// Get all items
app.get('/api/items', (req, res) => {
  res.status(200).json(items);
});

// Get a single item by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find((item) => item.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).send('Item not found');
  } else {
    res.status(200).json(item);
  }
});

// Create a new item
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    ...req.body
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an existing item
app.put('/api/items/:id', (req, res) => {
  const itemIndex = items.findIndex((item) => item.id === parseInt(req.params.id));
  if (itemIndex < 0) {
    res.status(404).send('Item not found');
  } else {
    items[itemIndex] = { ...items[itemIndex], ...req.body };
    res.status(200).json(items[itemIndex]);
  }
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
  const itemIndex = items.findIndex((item) => item.id === parseInt(req.params.id));
  if (itemIndex < 0) {
    res.status(404).send('Item not found');
  } else {
    items.splice(itemIndex, 1);
    res.status(204).send();
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});