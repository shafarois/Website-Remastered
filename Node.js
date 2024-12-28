const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // To handle CORS issues

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests

// Handle POST request for sending reports
app.post('/submit-report', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Report message is required' });
  }

  console.log('Received Report:', message);

  // Save report to a file (optional)
  const fs = require('fs');
  fs.appendFile('reports.txt', `${message}\n`, (err) => {
    if (err) {
      console.error('Failed to save report:', err);
      return res.status(500).json({ error: 'Failed to save report' });
    }
  });

  // Respond to the client
  res.json({ status: 'success', message: 'Report received successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});