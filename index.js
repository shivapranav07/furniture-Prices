const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint to get the price of a furniture item
app.post('/getPrice', (req, res) => {
  const item = req.body.item;
  
  // Read the JSON file
  fs.readFile('furniture.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read furniture file' });
    }
    
    // Parse the JSON data
    const prices = JSON.parse(data);
    
    // Check if the requested item exists in the JSON data
    if (prices[item]) {
      return res.json({ item: item, price: prices[item] });
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
