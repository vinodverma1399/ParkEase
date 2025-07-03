const express = require('express');// add express server file here 
const cors = require('cors'); // require cops 
require('dotenv').config(); // 
const connectDB = require('./db');  //here we import database

const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB connect and call
  connectDB(); 

// this is Middlewares 
app.use(cors());
app.use(express.json());

// this is test route
app.get('/', (req, res) => {
  res.send('ParkEase backend is running!');
});

// Start Server on at 8000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});



