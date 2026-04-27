const express = require('express');
const app = express();

// Allows app to read JSON from request body
app.use(express.json());

// Health check endpoint - Jenkins/K8s uses this to check if app is alive
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// All /notes requests go to routes.js
const notesRouter = require('./routes');
app.use('/notes', notesRouter);

module.exports = app;
