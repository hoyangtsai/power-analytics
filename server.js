'use strict';

const express = require('express');
const path = require('path');

// Constants
const PORT = process.env.PORT || 9000;
const HOST = '0.0.0.0';

// App
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});