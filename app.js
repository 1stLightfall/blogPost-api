const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load .env
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// MongoDB connect & server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
