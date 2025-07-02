// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');  // yaha import kiya

const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB connect call karo
  connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('🚀 ParkEase backend is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});



