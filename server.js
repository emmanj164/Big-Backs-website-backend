require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./auth');
const menuRoutes = require('./menu');
const orderRoutes = require('./orders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve frontend files

// Root route for clarity
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Initialize database and start
db.initialize().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}\nAccess at: http://localhost:${PORT}`));
});
