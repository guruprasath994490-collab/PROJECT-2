const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables from .env file
dotenv.config();

// Establish connection to MongoDB
connectDB();

// Initialize the Express app
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Body parser middleware to handle JSON payloads
app.use(express.json());

// Base informational route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DecodeLabs Backend API is running successfully.'
  });
});

// Mount user routes
app.use('/api/users', userRoutes);

// Middleware for handling undefined routes (404)
app.use(notFound);

// Centralized error handling middleware
app.use(errorHandler);

// Define PORT
const PORT = process.env.PORT || 5000;

// Listen for incoming requests
app.listen(PORT, () => {
  console.log(`\x1b[36m[Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}\x1b[0m`);
  console.log(`\x1b[36m[Server] Access URL: http://localhost:${PORT}\x1b[0m`);
});
