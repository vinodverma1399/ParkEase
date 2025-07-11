const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');  
const userRouter=require('./route/userRoute')

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/user',userRouter)

app.get('/',(req, res) => {
  res.send('🚀 ParkEase backend is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});



