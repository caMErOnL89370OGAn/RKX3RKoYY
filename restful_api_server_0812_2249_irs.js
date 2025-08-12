// 代码生成时间: 2025-08-12 22:49:02
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a data structure to store items
let items = [];

// POST endpoint to create a new item
app.post('/items', (req, res) => {
  // Error handling for missing item data
  if (!req.body.name) {
    return res.status(400).json({
      error: 'Item name is required'
    });
  }
  
  // Create a new item with a unique id
  const itemId = items.length + 1;
  const item = { id: itemId, ...req.body };
  
  // Add the item to the items array
  items.push(item);
  
  // Send the created item back to the client
  res.status(201).json(item);
});

// GET endpoint to get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET endpoint to get a single item by id
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(i => i.id === itemId);
  
  if (!item) {
    return res.status(404).json({
      error: 'Item not found'
    });
  }
  
  res.json(item);
});

// PUT endpoint to update an existing item
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  let item = items.find(i => i.id === itemId);
  
  if (!item) {
    return res.status(404).json({
      error: 'Item not found'
    });
  }
  
  // Update the item with the new data
  item = { ...item, ...req.body };
  
  // Find the index of the item and replace it
  const index = items.indexOf(item);
  items[index] = item;
  
  res.json(item);
});

// DELETE endpoint to delete an item
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === itemId);
  
  if (index === -1) {
    return res.status(404).json({
      error: 'Item not found'
    });
  }
  
  items.splice(index, 1);
  res.status(204).end();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
